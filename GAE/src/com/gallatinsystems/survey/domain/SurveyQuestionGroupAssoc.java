package com.gallatinsystems.survey.domain;

import java.lang.reflect.Field;

import javax.jdo.annotations.PersistenceCapable;

import com.gallatinsystems.framework.domain.BaseDomain;

@PersistenceCapable
public class SurveyQuestionGroupAssoc extends BaseDomain{
	
	private static final long serialVersionUID = 6593530633749910719L;
	
	private Long questionGroupId = null;
	private Long surveyId = null;
	private Integer order = null;
	
	
	
	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
		String newLine = System.getProperty("line.separator");

		result.append(this.getClass().getName());
		result.append(" Object {");
		result.append(newLine);

		// determine fields declared in this class only (no fields of
		// superclass)
		Field[] fields = this.getClass().getDeclaredFields();

		// print field names paired with their values
		for (Field field : fields) {
			result.append("  ");
			try {
				result.append(field.getName());
				result.append(": ");
				// requires access to private field:
				result.append(field.get(this));
			} catch (IllegalAccessException ex) {
				System.out.println(ex);
			}
			result.append(newLine);
		}
		result.append("}");

		return result.toString();
	}



	public void setQuestionGroupId(Long questionGroupId) {
		this.questionGroupId = questionGroupId;
	}



	public Long getQuestionGroupId() {
		return questionGroupId;
	}



	public void setSurveyId(Long surveyId) {
		this.surveyId = surveyId;
	}



	public Long getSurveyId() {
		return surveyId;
	}



	public void setOrder(Integer order) {
		this.order = order;
	}



	public Integer getOrder() {
		return order;
	}

}
