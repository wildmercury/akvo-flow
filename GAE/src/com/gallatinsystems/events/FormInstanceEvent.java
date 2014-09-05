package com.gallatinsystems.events;

public class FormInstanceEvent {
	
	private Subject subject;
	private Context context;
	private String verb;
	private FormInstance forminstance;
	
	public Subject getSubject() {
		return subject;
	}
	
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	
	public Context getContext() {
		return context;
	}
	
	public void setContext(Context context) {
		this.context = context;
	}
	
	public String getVerb() {
		return verb;
	}
	
	public void setVerb(String verb) {
		this.verb = verb;
	}
	
	public FormInstance getForminstance() {
		return forminstance;
	}
	
	public void setForminstance(FormInstance forminstance) {
		this.forminstance = forminstance;
	}
}