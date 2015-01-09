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

package com.gallatinsystems.events;

public class Event {
	
	private EventSubject subject;
	private String action;
	private EventObject object;
	private EventContext context;
	
	public Event (EventSubject subject, String action, EventObject object, EventContext context) {
		this.subject = subject;
		this.action = action;
		this.object = object;
		this.context = context;
	}
	
	public EventSubject getSubject() {
		return subject;
	}
	
	public void setSubject(EventSubject subject) {
		this.subject = subject;
	}

	public String getAction() {
		return action;
	}
	
	public void setAction(String action) {
		this.action = action;
	}
	
	public EventContext getContext() {
		return context;
	}
	
	public void setContext(EventContext context) {
		this.context = context;
	}
	
	public EventObject getObject() {
		return object;
	}
	
	public void setObject(EventObject object) {
		this.object = object;
	}
}