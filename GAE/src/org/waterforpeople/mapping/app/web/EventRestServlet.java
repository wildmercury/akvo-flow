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
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import org.codehaus.jackson.map.ObjectMapper;

import com.gallatinsystems.events.Event;
import com.gallatinsystems.events.EventContext;
import com.gallatinsystems.events.EventObject;
import com.gallatinsystems.events.EventSubject;
import com.gallatinsystems.events.UnifiedLog;
import com.gallatinsystems.framework.dao.BaseDAO;
import com.gallatinsystems.framework.rest.AbstractRestApiServlet;
import com.gallatinsystems.framework.rest.RestRequest;
import com.gallatinsystems.framework.rest.RestResponse;

/**
 * RESTful servlet that is used to send log data to the unified log
 */
public class EventRestServlet extends AbstractRestApiServlet {
    private static final long serialVersionUID = 5923399458369692813L;
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
        } catch (RuntimeException | ClassNotFoundException e) {
            log.log(Level.SEVERE, "Could not process "
            		+ eReq.getKind() + " event with id: "
            		+ eReq.getId() + e.getMessage());
        }
        return resp;
    }

    @SuppressWarnings("unchecked")
	private void ingestEvent(EventRestRequest eReq) throws ClassNotFoundException {
    	Class<?> kindClass = Class.forName(eReq.getKind());

    	if (kindClass != null){
    		// extract name of class (strip of first part of fully qualified name)
			String kindName = eReq.getKind().substring(eReq.getKind().lastIndexOf('.') + 1);
    		BaseDAO<?> dao  = new BaseDAO(kindClass);
    		Boolean deleted = eReq.getActionType().equals(EventRestRequest.ACTION_DELETED);
    		Object o = null;
    		if (!deleted){
    			o = dao.getByKey(eReq.getId());
    		}

    		if (o != null || deleted){
    			EventSubject eSubj = new EventSubject(eReq.getOrgId(), eReq.getUserId());
    			action = kindName + eReq.getActionType() ;
    			// if it is a deleted object, o will be null here.
    			EventObject eObj = new EventObject(kindName, o, eReq.getId());
    			EventContext eCont = new EventContext(eReq.getTimestamp());
    			Event newEvent = new Event(eSubj, action, eObj, eCont);

    			ObjectMapper om = new ObjectMapper();
    	    	try {
    				String eventString = om.writeValueAsString(newEvent);
    				UnifiedLog.dispatch("data",eventString);
    			} catch (IOException e) {
    				// TODO Auto-generated catch block
    				e.printStackTrace();
    			}
    		}
    	}
    }

	@Override
    protected void writeOkResponse(RestResponse resp) throws Exception {
        getResponse().setStatus(200);
    }
}