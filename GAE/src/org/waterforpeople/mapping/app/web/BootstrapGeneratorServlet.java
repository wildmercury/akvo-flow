/*
 *  Copyright (C) 2010-2012 Stichting Akvo (Akvo Foundation)
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

package org.waterforpeople.mapping.app.web;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.waterforpeople.mapping.app.web.dto.BootstrapGeneratorRequest;

import com.gallatinsystems.common.objectstore.ObjectStore;
import com.gallatinsystems.common.objectstore.ObjectStore.Container;
import com.gallatinsystems.common.util.MailUtil;
import com.gallatinsystems.common.util.PropertyUtil;
import com.gallatinsystems.common.util.ZipUtil;
import com.gallatinsystems.framework.rest.AbstractRestApiServlet;
import com.gallatinsystems.framework.rest.RestRequest;
import com.gallatinsystems.framework.rest.RestResponse;
import com.gallatinsystems.survey.dao.SurveyDAO;
import com.gallatinsystems.survey.domain.Survey;

/**
 * downloads publishes survey xml files and forms a zip that conforms to the
 * structure of the bootstrap.zip file expected by the device
 * 
 * @author Christopher Fagiani
 * 
 */
public class BootstrapGeneratorServlet extends AbstractRestApiServlet {
	private static final Logger LOG = Logger.getLogger(BootstrapGeneratorServlet.class.getName());

	private static final long serialVersionUID = -6645180848307957119L;
	private static final String DB_INST_ENTRY = "dbinstructions.sql";
	private static final String EMAIL_FROM_ADDRESS_KEY = "emailFromAddress";
	private static final String EMAIL_SUB = "FLOW Bootstrap File";
	private static final String EMAIL_BODY = "Click the link to download the bootstrap file";
	private static final String ERROR_BODY = "There were errors while attempting to generate the bootstrap file:";
	
	private ObjectStore mObjectStore;
	private String mBootstrapContainer;
	private String mSurveysContainer;

	private SurveyDAO surveyDao;

	public BootstrapGeneratorServlet() {
		super();
		surveyDao = new SurveyDAO();
		
		mObjectStore = ObjectStore.instantiate();
		mBootstrapContainer = ObjectStore.getContainerName(Container.BOOTSTRAP);
		mSurveysContainer = ObjectStore.getContainerName(Container.SURVEYS);
	}

	@Override
	protected RestRequest convertRequest() throws Exception {
		HttpServletRequest req = getRequest();
		RestRequest restRequest = new BootstrapGeneratorRequest();
		restRequest.populateFromHttpRequest(req);
		return restRequest;
	}

	@Override
	protected RestResponse handleRequest(RestRequest req) throws Exception {
		RestResponse response = new RestResponse();
		BootstrapGeneratorRequest bootStrapReq = (BootstrapGeneratorRequest) req;
		if (BootstrapGeneratorRequest.GEN_ACTION.equalsIgnoreCase(bootStrapReq
				.getAction())) {
			generateFile(bootStrapReq);
		}
		return response;
	}

	@Override
	protected void writeOkResponse(RestResponse resp) throws Exception {
		// no-op
	}

	private void generateFile(BootstrapGeneratorRequest req) {
		Map<String, String> contentMap = new HashMap<String, String>();
		StringBuilder errors = new StringBuilder();

		if (req.getSurveyIds() != null) {
			for (Long id : req.getSurveyIds()) {
				try {
					Survey s = surveyDao.getById(id);
					String name = s.getName().replaceAll(" ", "_");
					
					final String filename = s.getKey().getId() + ".xml";
					final String survey = mObjectStore.readFile(mSurveysContainer, filename);
					
					contentMap.put(s.getKey().getId() + "/" + name + ".xml",
							survey);
				} catch (IOException e) {
					errors.append("Could not include survey id " + id + "\n");
				}
			}
		}
		if (req.getDbInstructions() != null
				&& req.getDbInstructions().trim().length() > 0) {
			contentMap.put(DB_INST_ENTRY, req.getDbInstructions().trim());
		}
		ByteArrayOutputStream os = ZipUtil.generateZip(contentMap);
		String filename = System.currentTimeMillis() + "-bs.zip";
		
		boolean uploadedFile = false;
		try {
			uploadedFile = mObjectStore.uploadFile(mBootstrapContainer, filename, os.toByteArray());
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
		}
		
		if (!uploadedFile) {
			errors.append("Could not upload file to Swift");
		}

		String body = EMAIL_BODY;
		if (errors.toString().trim().length() > 0) {
			body = ERROR_BODY + "\n\n" + errors.toString();
		} else {
			body += "\n\n" + ObjectStore.getApiUrl() + "/" + ObjectStore.getContainerName(Container.BOOTSTRAP) + "/" + filename;
		}
		MailUtil.sendMail(PropertyUtil.getProperty(EMAIL_FROM_ADDRESS_KEY),
				"FLOW", req.getEmail(), EMAIL_SUB, body);
	}

}
