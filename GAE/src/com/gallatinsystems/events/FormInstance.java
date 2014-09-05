package com.gallatinsystems.events;

import java.util.Date;

public class FormInstance {
	
	private String formInstanceId;
	private String formId;
	private Date collectionDate;
	private String dataPointId;
	private Long surveyalTime;
	
	public String getFormInstanceId() {
		return formInstanceId;
	}
	
	public void setFormInstanceId(String formInstanceId) {
		this.formInstanceId = formInstanceId;
	}
	
	public String getFormId() {
		return formId;
	}
	
	public void setFormId(String formId) {
		this.formId = formId;
	}
	
	public Date getCollectionDate() {
		return collectionDate;
	}
	
	public void setCollectionDate(Date collectionDate) {
		this.collectionDate = collectionDate;
	}
	
	public String getDataPointId() {
		return dataPointId;
	}
	
	public void setDataPointId(String dataPointId) {
		this.dataPointId = dataPointId;
	}
	
	public Long getSurveyalTime() {
		return surveyalTime;
	}
	
	public void setSurveyalTime(Long surveyalTime) {
		this.surveyalTime = surveyalTime;
	}
}