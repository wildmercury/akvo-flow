package com.gallatinsystems.events;

import java.util.Date;

public class Context {
	private Date timestamp;
	
	public Context() {
		timestamp = new Date();
	}
	
	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
}