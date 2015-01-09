/*
 *  Copyright (C) 2015 Stichting Akvo (Akvo Foundation)
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

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.codehaus.jackson.map.ObjectMapper;

import com.gallatinsystems.events.Event;
import com.gallatinsystems.events.EventContext;
import com.gallatinsystems.events.EventObject;
import com.gallatinsystems.events.EventSubject;

import com.gallatinsystems.events.QuestionEventData;
import com.gallatinsystems.events.QuestionGroupEventData;
import com.gallatinsystems.events.SurveyEventData;
import com.gallatinsystems.events.SurveyGroupEventData;
import com.gallatinsystems.events.UnifiedLog;
import com.gallatinsystems.framework.rest.AbstractRestApiServlet;
import com.gallatinsystems.framework.rest.RestRequest;
import com.gallatinsystems.framework.rest.RestResponse;
import com.gallatinsystems.survey.dao.QuestionDao;
import com.gallatinsystems.survey.dao.QuestionGroupDao;
import com.gallatinsystems.survey.dao.SurveyDAO;
import com.gallatinsystems.survey.dao.SurveyGroupDAO;
import com.gallatinsystems.survey.domain.Question;
import com.gallatinsystems.survey.domain.QuestionGroup;
import com.gallatinsystems.survey.domain.Survey;
import com.gallatinsystems.survey.domain.SurveyGroup;

/**
 * RESTful servlet that is used to send log data to the unified log
 */
public class EventRestServlet extends AbstractRestApiServlet {
    private static final long serialVersionUID = 5923399458369692813L;
    
    public static final String QUESTION_CREATED = "questionCreated";
    public static final String QUESTION_UPDATED = "questionUpdated";
    
    
    private static final Logger log = Logger
            .getLogger(EventRestServlet.class.getName());
    
    private String action;

    @Override
    protected RestRequest convertRequest() throws Exception {
        HttpServletRequest req = getRequest();
        RestRequest restRequest = new EventRestRequest();
        restRequest.populateFromHttpRequest(req);
        return restRequest;
    }

    @Override
    protected RestResponse handleRequest(RestRequest req) throws Exception {
        RestResponse resp = new RestResponse();
        EventRestRequest eReq = (EventRestRequest) req;
        try {
            ingestEvent(eReq);
        } catch (RuntimeException e) {
            log.log(Level.SEVERE, "Could not process "
            		+ eReq.getKind() + " event with id: "
            		+ eReq.getId() + e.getMessage());
        }
        return resp;
    }

    private void ingestEvent(EventRestRequest eReq) {
    	
		// depending on kind, call appropriate method
    	if (eReq.getKind() != null){
    		switch (eReq.getKind()){
    			case EventRestRequest.SURVEY_GROUP:
    				dispatchSurveyGroupEvent(eReq);
    				break;
    			
    			case EventRestRequest.SURVEY:
    				dispatchSurveyEvent(eReq);
    				break;

    			case EventRestRequest.QUESTION_GROUP:
    				dispatchQuestionGroupEvent(eReq);
    				break;
    				
    			case EventRestRequest.QUESTION:
    				dispatchQuestionEvent(eReq);
    				break;
    		}
    	}
	}
    
    /*
     * Creates a new event and hydrates the common properties of an event, 
     * such as the subject (orgId and userId), the context (timestamp), and 
     * the action. Only the object is not known yet.
     */
    private Event createAndHydrateNewEvent(EventRestRequest eReq){
    	EventSubject eSubj = new EventSubject(eReq.getOrgId(), eReq.getUserId());
		EventContext eCont = new EventContext(eReq.getTimestamp());
		action = eReq.getKind() + (eReq.getCreated() ? "Created" : "Updated");
		Event newEvent = new Event(eSubj, action, null, eCont);
		return newEvent;
    }
    
    /*
     * Copies matching properties from a full object to the corresponding
     * event data object, which only has a subset of the properties.
     */
    private Object copyToEventData(Object event, Object orig){
    	try {
			BeanUtils.copyProperties(event, orig);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return event;
    }
    
    /*
     * Sends the hydrated event off to be dispatched to the unified log
     */
    private void dispatchToUnifiedLog(Event event){
    	ObjectMapper om = new ObjectMapper();
    	try {
			String eventString = om.writeValueAsString(event);
			UnifiedLog.dispatch("data",eventString);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    /*
     * Creates a new event, and populates it.
     */
    private Event createEvent(Object orig, Object eventData, EventRestRequest eReq){
    	copyToEventData(eventData,orig);
    	EventObject eObj = new EventObject(eReq.getKind(),eventData);
		Event event = createAndHydrateNewEvent(eReq);
		event.setObject(eObj);
		return event;
    }
    
    /*
     * Dispatches a question event
     */
	private void dispatchQuestionEvent(EventRestRequest eReq) {
		// get the question from the datastore
		QuestionDao qDao = new QuestionDao();
		Question q = qDao.getByKey(eReq.getId());
		if (q != null) {
			QuestionEventData qEventData = new QuestionEventData();
			dispatchToUnifiedLog(createEvent(q,qEventData,eReq));
		}	
	}

	 /*
     * Dispatches a question group event
     */
	private void dispatchQuestionGroupEvent(EventRestRequest eReq) {
		// get the questionGroup from the datastore
		QuestionGroupDao qgDao = new QuestionGroupDao();
		QuestionGroup qg = qgDao.getByKey(eReq.getId());
		if (qg != null) {
			QuestionGroupEventData qgEventData = new QuestionGroupEventData();
			dispatchToUnifiedLog(createEvent(qg,qgEventData,eReq));
		}	
	}

	 /*
     * Dispatches a survey event
     */
	private void dispatchSurveyEvent(EventRestRequest eReq) {
		// get the survey from the datastore
		SurveyDAO sDao = new SurveyDAO();
		Survey s = sDao.getByKey(eReq.getId());
		if (s != null) {
			SurveyEventData sEventData = new SurveyEventData();
			dispatchToUnifiedLog(createEvent(s,sEventData,eReq));
		}	
	}

	 /*
     * Dispatches a survey group event
     */
	private void dispatchSurveyGroupEvent(EventRestRequest eReq) {
		// get the survey group from the datastore
		SurveyGroupDAO sgDao = new SurveyGroupDAO();
		SurveyGroup sg = sgDao.getByKey(eReq.getId());
		// only send an event if this is an actual group of forms, not a folder
		if (sg != null && sg.getProjectType() == SurveyGroup.ProjectType.PROJECT) {
			SurveyGroupEventData sgEventData = new SurveyGroupEventData();
			dispatchToUnifiedLog(createEvent(sg,sgEventData,eReq));
		}			
	}

	@Override
    protected void writeOkResponse(RestResponse resp) throws Exception {
        getResponse().setStatus(200);
    }
}