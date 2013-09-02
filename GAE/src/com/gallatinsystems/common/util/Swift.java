/*
 *  Copyright (C) 2013 Stichting Akvo (Akvo Foundation)
 *
 *  This file is part of Akvo FLOW.
 *
 *  Akvo FLOW is free software: you can redistribute it and modify it under the terms of
 *  the GNU Affero General Public License (AGPL) as published by the Free Software Foundation,
 *  either version 3 of the License or any later version.
 *
 *  Akvo FLOW is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  See the GNU Affero General Public License included below for more details.
 *
 *  The full license text can also be seen at <http://www.gnu.org/licenses/agpl.html>.
 */

package com.gallatinsystems.common.util;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.log4j.Logger;
import org.apache.http.HttpStatus;

/**
 * OpenStack/Swift uploader. This version uses Swift v1.0, with Token based
 * authentication. <br>
 * TODO:
 * <ul>
 * <li>Cache the token and storage url</li>
 * <li>Upgrade API version depending on the backend</li>
 * <li>Add MIME type to objects</li>
 * <li>Discuss container security options (public/private)</li>
 * </ul>
 * 
 */
public class Swift {
	private static final Logger LOG = Logger.getLogger(Swift.class.getName());

	private String mApiUrl;
	private String mUsername;
	private String mApiKey;
	private String mStorageUrl;
	private String mToken;

	public Swift(String apiUrl, String username, String apiKey) {
		mApiUrl = apiUrl;
		mUsername = username;
		mApiKey = apiKey;
	}

	public boolean uploadFile(String container, String name, byte[] data) {
		try {
			boolean reauthenticate = true;
			if (mToken == null || "".equals(mToken)) {
				reauthenticate = false;
				authenticate();
			}

			return uploadFile(container, name, data, reauthenticate);
		} catch (ApiException e) {
			LOG.error(e.getMessage());
			return false;
		} catch (IOException e) {
			LOG.error(e.getMessage());
			return false;
		}
	}

	private boolean uploadFile(String container, String name, byte[] data,
			boolean reauthenticate) throws ApiException, IOException {
		LOG.info("uploading file: " + name);
		try {
			return put(container, name, data);
		} catch (UnauthorizedException e) {
			if (reauthenticate) {
				authenticate();
				return uploadFile(container, name, data, false);
			}
			return false;
		}
	}

	private boolean put(String container, String name, byte[] data)
			throws UnauthorizedException, IOException {
		InputStream in = null;
		OutputStream out = null;
		HttpURLConnection conn = null;

		try {
			URL url = new URL(mStorageUrl + "/" + container + "/" + name);
			conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			conn.setRequestProperty(Header.AUTH_TOKEN, mToken);
			conn.setRequestProperty(Header.ETAG, MD5Util.generateChecksum(data));

			out = new BufferedOutputStream(conn.getOutputStream());
			out.write(data);
			out.flush();

			int status = 0;
			try {
				status = conn.getResponseCode();
			} catch (IOException e) {
				// HttpUrlConnection will throw an IOException if any 4XX
				// response is sent. If we request the status again, this
				// time the internal status will be properly set, and we'll be
				// able to retrieve it.
				status = conn.getResponseCode();
			}
			if (status == HttpStatus.SC_UNAUTHORIZED) {
				throw new UnauthorizedException("401 - Unauthorized");
			} else if (status != HttpStatus.SC_CREATED) {
				throw new ApiException("Status Code: " + status
						+ ". Expected: 201 - Created");
			}

			return true;
		} finally {
			if (conn != null)
				conn.disconnect();
			if (in != null) {
				try {
					in.close();
				} catch (Exception ignored) {}
			}
			if (out != null) {
				try {
					out.close();
				} catch (Exception ignored) {}
			}
		}
	}

	private void authenticate() throws ApiException, IOException {
		URL url = new URL(mApiUrl + "/" + Api.AUTH);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		try {
			conn.setRequestProperty(Header.AUTH_USER, mUsername);
			conn.setRequestProperty(Header.AUTH_KEY, mApiKey);
	
			final int statusCode = conn.getResponseCode();
			if (statusCode == 200) {
				mToken = conn.getHeaderField(Header.AUTH_TOKEN);
				mStorageUrl = conn.getHeaderField(Header.STORAGE_URL);
			} else {
				throw new ApiException(
						"Could not authenticate with Swift. Status Code: " + statusCode);
			}
		} finally {
			conn.disconnect();
		}
	}

	@SuppressWarnings("serial")
	class ApiException extends RuntimeException {
		ApiException(String message) {
			super(message);
		}
	}

	@SuppressWarnings("serial")
	class UnauthorizedException extends ApiException {
		UnauthorizedException(String message) {
			super(message);
		}
	}

	interface Api {
		static final String AUTH = "/auth/v1.0";
	}

	interface Header {
		static final String AUTH_USER   = "X-Auth-User";
		static final String AUTH_KEY    = "X-Auth-Key";
		static final String AUTH_TOKEN  = "X-Auth-Token";
		static final String STORAGE_URL = "X-Storage-Url";
		static final String ETAG        = "ETag";
	}
}
