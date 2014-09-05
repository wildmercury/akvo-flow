package com.gallatinsystems.events;

import java.util.List;

public class FormData {
	
	private String formInstanceId;
	private String formId;
	private List<Fact> facts;
	
	public String getFormInstanceId() {
		return formInstanceId;
	}
	
	public void setFormInstanceId(String formInstanceId) {
		this.formInstanceId = formInstanceId;
	}
	
	public List<Fact> getFacts() {
		return facts;
	}
	
	public void setFacts(List<Fact> facts) {
		this.facts = facts;
	}

	public String getFormId() {
		return formId;
	}

	public void setFormId(String formId) {
		this.formId = formId;
	}
}