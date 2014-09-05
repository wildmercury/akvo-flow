package com.gallatinsystems.events;

public class Subject {
	private int orgId;
	private String source;
	private String userId;
	
	public Subject (int orgId, String source, String userId) {
		this.orgId = orgId;
		this.source = source;
		this.userId = userId;
	}
	
	public int getOrgId() {
		return orgId;
	}
	
	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}
	
	public String getSource() {
		return source;
	}
	
	public void setSource(String source) {
		this.source = source;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}