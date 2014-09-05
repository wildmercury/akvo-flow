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

package com.gallatinsystems.surveyal.app.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.map.ObjectMapper;
import org.waterforpeople.mapping.dao.QuestionAnswerStoreDao;
import org.waterforpeople.mapping.dao.SurveyInstanceDAO;
import org.waterforpeople.mapping.domain.QuestionAnswerStore;
import org.waterforpeople.mapping.domain.SurveyInstance;

import com.gallatinsystems.events.Context;
import com.gallatinsystems.events.FormData;
import com.gallatinsystems.events.FormDataEvent;
import com.gallatinsystems.events.FormInstance;
import com.gallatinsystems.events.FormInstanceEvent;
import com.gallatinsystems.events.Fact;
import com.gallatinsystems.events.Kafka;
import com.gallatinsystems.events.Subject;
import com.gallatinsystems.framework.rest.AbstractRestApiServlet;
import com.gallatinsystems.framework.rest.RestRequest;
import com.gallatinsystems.framework.rest.RestResponse;
import com.gallatinsystems.survey.dao.QuestionDao;
import com.gallatinsystems.survey.domain.Question;

/**
 * RESTful servlet that is used to send log data to kafka
 */
public class KafkaRestServlet extends AbstractRestApiServlet {
    private static final long serialVersionUID = 5923399458369692813L;
    private static final Logger log = Logger
            .getLogger(KafkaRestServlet.class.getName());
    private SurveyInstanceDAO siDao;
    private QuestionDao qDao;

    /**
     * initializes the servlet by instantiating all needed Dao classes and loading properties from
     * the configuration.
     */
    public KafkaRestServlet() {
        siDao = new SurveyInstanceDAO();
        qDao = new QuestionDao();
    }

    @Override
    protected RestRequest convertRequest() throws Exception {
        HttpServletRequest req = getRequest();
        RestRequest restRequest = new SurveyalRestRequest();
        restRequest.populateFromHttpRequest(req);
        return restRequest;
    }

    @Override
    protected RestResponse handleRequest(RestRequest req) throws Exception {
        RestResponse resp = new RestResponse();
        SurveyalRestRequest sReq = (SurveyalRestRequest) req;
        if (SurveyalRestRequest.INGEST_INSTANCE_ACTION.equalsIgnoreCase(req
                .getAction())) {
            try {
                ingestSurveyInstance(sReq.getSurveyInstanceId());
            } catch (RuntimeException e) {
                log.log(Level.SEVERE,
                        "Could not process instance: "
                                + sReq.getSurveyInstanceId() + ": "
                                + e.getMessage());
            }
        } 
        return resp;
    }


    private void ingestSurveyInstance(Long surveyInstanceId) {
    	log.log(Level.INFO,"Entering ingest survey Instance");
        SurveyInstance instance = siDao.getByKey(surveyInstanceId);
        if (instance != null) {
            ingestSurveyInstance(instance);
        } else
            log.log(Level.INFO,
                    "Got to ingestSurveyInstance, but instance is null for surveyInstanceId: "
                            + surveyInstanceId);
    }

    /**
     *
     * @param surveyInstanceId
     */
    private void ingestSurveyInstance(SurveyInstance surveyInstance) {
    	
    	// create form instance
    	Context context = new Context();
    	Subject subject = new Subject(13,"device",surveyInstance.getSubmitterName());
    	FormInstance formInstance = new FormInstance();
    	FormInstanceEvent fiEvent = new FormInstanceEvent();
    
    	formInstance.setCollectionDate(surveyInstance.getCollectionDate());
    	formInstance.setDataPointId("");
    	formInstance.setFormId(surveyInstance.getSurveyId().toString());
    	formInstance.setSurveyalTime(surveyInstance.getSurveyalTime());
    	formInstance.setFormInstanceId(surveyInstance.getUuid());
    	
    	fiEvent.setContext(context);
    	fiEvent.setVerb("formInstanceCreated");
    	fiEvent.setSubject(subject);
    	fiEvent.setForminstance(formInstance);
    	
    	
    	// create form data
    	List<Fact> factList = new ArrayList<Fact>();
    	List<QuestionAnswerStore> qaList = siDao.listQuestionAnswerStore(surveyInstance.getKey().getId(), null);
    	
    	for (QuestionAnswerStore qa : qaList){
    		Long qId = Long.valueOf(qa.getQuestionID());
    		Question q = qDao.getByKey(qId);
    		Fact fact = new Fact();
    		fact.setFactId(UUID.randomUUID().toString());
    		fact.setQuestionId(q.getQuestionId());
    		fact.setVal(qa.getValue());
    		if (q != null) {
    			fact.setType(q.getType().toString());
    		};
    		factList.add(fact);
    	}
    	
    	FormData fData = new FormData();
    	fData.setFacts(factList);
    	fData.setFormInstanceId(formInstance.getFormInstanceId());
    	fData.setFormId(formInstance.getFormId());
    	
    	// create form data event
    	FormDataEvent fdEvent = new FormDataEvent();
    	fdEvent.setSubject(subject);
    	fdEvent.setContext(context);
    	fdEvent.setVerb("formDataCreated");
    	fdEvent.setFormData(fData);
    	
    	ObjectMapper om = new ObjectMapper();
    	
    	try {
			String formInstanceResult = om.writeValueAsString(fiEvent);
			String formDataResult = om.writeValueAsString(fdEvent);
			log.log(Level.INFO,"form instance result: ",formInstanceResult);
			log.log(Level.INFO,"form data result: ",formDataResult);
			
			Kafka.dispatch("data",formInstanceResult);
			Kafka.dispatch("data",formDataResult);
			
		} catch (IOException e) {
			log.log(Level.SEVERE,"Something went wrong writing to Kafka",e.getMessage());
		} 
    }

    
    @Override
    protected void writeOkResponse(RestResponse resp) throws Exception {
        getResponse().setStatus(200);
    }

   
}
