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

package com.gallatinsystems.common.objectstore;

import java.io.IOException;
import java.net.HttpURLConnection;

import com.gallatinsystems.common.util.PropertyUtil;

/**
 * ObjectStore abstract uploader. This helper class allows the application
 * to be provider agnostic, getting an appropriate implementation depending
 * on the properties of the application.
 */
public abstract class ObjectStore {
	/**
	 * Available containers
	 */
	public enum Container { RESPONSES, IMAGES, BOOTSTRAP, SURVEYS, REPORTS };
	
	/**
	 * Available providers
	 */
	private enum Provider { SWIFT };
	
	/**
	 * Instantiate an ObjectStore implementation. The object class will depend on the
	 * objectstore_provider property defined in the properties xml.
	 * 
	 * @return An appropriate subclass implementation of ObjectStore
	 */
	public static ObjectStore instantiate() {
		switch (getProvider()) {
		case SWIFT:
			String apiUrl = PropertyUtil.getProperty(Properties.URL);
			String username = PropertyUtil.getProperty(Properties.USER);
			String password = PropertyUtil.getProperty(Properties.KEY);
			return new Swift(apiUrl, username, password);
		}
		return null;
	}
	
	/**
	 * Get ObjectStore's base URL
	 * 
	 * @return base URL
	 */
	public static String getApiUrl() {
		return PropertyUtil.getProperty(Properties.URL);
	}
	
	/**
	 * Get the name of the container defined in the properties
	 * 
	 * @param container The container to look up
	 * @return the name of the container, as a String
	 */
	public static String getContainerName(Container container) {
		switch (container) {
		case RESPONSES:
			return PropertyUtil.getProperty(Properties.RESPONSES);
		case SURVEYS:
			return PropertyUtil.getProperty(Properties.SURVEYS);
		case BOOTSTRAP:
			return PropertyUtil.getProperty(Properties.BOOTSTRAP);
		case IMAGES:
			return PropertyUtil.getProperty(Properties.IMAGES);
		case REPORTS:
			return PropertyUtil.getProperty(Properties.REPORTS);
		default:
			throw new RuntimeException("Unknown container: " + container);
		}
	}
	
	/**
	 * Download a file from the ObjectStore and return it as a String
	 * 
	 * @param container ObjectStore container
	 * @param name Name of the file in the ObjectStore
	 * @return The downloaded file, as a String
	 * @throws IOException
	 */
	public abstract String readFile(String container, String name)
			throws IOException;

	/**
	 * Upload a given file to the ObjectStore
	 * 
	 * @param container ObjectStore container
	 * @param name Name of the file in the ObjectStore
	 * @param data the file to upload, in bytes
	 * @return true if the operation succeeds, false otherwise
	 * @throws IOException
	 */
	public abstract boolean uploadFile(String container, String name,
			byte[] data) throws IOException;

	/**
	 * Get an authenticated connection to the ObjectStore. Is up to
	 * the caller the closure of this connection
	 * 
	 * @param container ObjectStore container
	 * @param name Name of the file in the ObjectStore
	 * @return A HttpURLConnection with the authentication headers set
	 * @throws IOException
	 */
	public abstract HttpURLConnection newAuthConnection(String container,
			String name) throws IOException;
	
	private static Provider getProvider() {
		final String providerName = PropertyUtil.getProperty(Properties.PROVIDER);
		if (ProviderName.SWIFT.equalsIgnoreCase(providerName)) {
			return Provider.SWIFT;
		} 
		return null;// Unknown provider
	}
	
	/**
	 * Available provider names. The provider declared in appengine-web.xml
	 * should be any of these.
	 *
	 */
	interface ProviderName {
		String SWIFT = "swift";
	}
	
	/**
	 * Properties to be defined in appengine-web.xml
	 * They include credentials to authenticate with the objectstore
	 * and the name of the containers used to store FLOW data.
	 *
	 */
	interface Properties {
		String PROVIDER  = "objectstore_provider";
		String URL       = "objectstore_url";
		String USER      = "objectstore_user";
		String KEY       = "objectstore_key";
		String RESPONSES = "responses_container";
		String IMAGES    = "images_container";
		String BOOTSTRAP = "bootstrap_container";
		String SURVEYS   = "surveys_container";
		String REPORTS   = "reports_container";
	}

}
