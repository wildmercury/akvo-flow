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
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.log4j.Logger;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpStatus;

/**
 * OpenStack/Swift uploader. This version uses Http Basic Authentication
 * <br>
 * TODO:
 * <ul>
 * <li>Add MIME type to objects</li>
 * <li>Discuss container security options (public/private)</li>
 * </ul>
 * 
 */
public class Swift {
	private static final Logger LOG = Logger.getLogger(Swift.class.getName());

	private String mApiUrl;
	private String mUsername;
	private String mPassword;

	public Swift(String apiUrl, String username, String password) {
		mApiUrl = apiUrl;
		mUsername = username;
		mPassword = password;
	}

	public boolean uploadFile(String container, String name, byte[] data) {
		LOG.info("Uploading file: " + name);
		try {
			return put(container, name, data);
		} catch (IOException e) {
			LOG.error(e.getMessage());
			return false;
		}
	}

	private boolean put(String container, String name, byte[] data)
			throws IOException {
		OutputStream out = null;
		HttpURLConnection conn = null;
		boolean ok = false;

		try {
			URL url = new URL(mApiUrl + "/" + container + "/" + name);
			conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			conn.setRequestProperty(Header.AUTH, getAuthHeader());
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
			
			ok = (HttpStatus.SC_CREATED == status);
			if (!ok) {
    			LOG.error("Status Code: " + status + ". Expected: 201 - Created");
			}

			return ok;
		} finally {
			if (conn != null)
				conn.disconnect();
			if (out != null) {
				try {
					out.close();
				} catch (Exception ignored) {}
			}
		}
	}
	
	private String getAuthHeader() {
		final String userPassword = mUsername + ":" + mPassword;
        final String auth = new String(Base64.encodeBase64(userPassword.getBytes()));
		return "Basic " + auth;
	}

	interface Header {
		static final String AUTH = "Authorization";
		static final String ETAG = "ETag";
	}
}
