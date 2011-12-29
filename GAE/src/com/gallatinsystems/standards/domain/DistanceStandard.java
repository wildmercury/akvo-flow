package com.gallatinsystems.standards.domain;

import javax.jdo.annotations.PersistenceCapable;

import org.waterforpeople.mapping.domain.AccessPoint;
import org.waterforpeople.mapping.domain.AccessPoint.AccessPointType;
import org.waterforpeople.mapping.domain.AccessPoint.LocationType;

import com.gallatinsystems.framework.domain.BaseDomain;
import com.gallatinsystems.standards.domain.Standard.StandardScope;
import com.gallatinsystems.standards.domain.Standard.StandardType;

@PersistenceCapable
public class DistanceStandard extends BaseDomain {

	/**
	 * ds.setAccessPointType(AccessPointType.WATER_POINT);
		ds.setStandardType(StandardType.WaterPointLevelOfService);
		ds.setStandardScope(StandardScope.Local);
		ds.setCountry("BO");
	 */
	private static final long serialVersionUID = -9111026583324258277L;

	private AccessPoint.LocationType locationType = null;
	private Integer maxDistance = null;
	private AccessPointType accessPointType = null;
	private StandardType standardType = null;
	private String countryCode = null;
	private StandardScope standardScope = null;
	private String standardDescription = null;
	
	public String getStandardDescription() {
		return standardDescription;
	}

	public void setStandardDescription(String standardDescription) {
		this.standardDescription = standardDescription;
	}

	public AccessPointType getAccessPointType() {
		return accessPointType;
	}

	public void setAccessPointType(AccessPointType accessPointType) {
		this.accessPointType = accessPointType;
	}

	public StandardType getStandardType() {
		return standardType;
	}

	public void setStandardType(StandardType standardType) {
		this.standardType = standardType;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public StandardScope getStandardScope() {
		return standardScope;
	}

	public void setStandardScope(StandardScope standardScope) {
		this.standardScope = standardScope;
	}

	public LocationType getLocationType() {
		return locationType;
	}

	public void setLocationType(LocationType locationType) {
		this.locationType = locationType;
	}

	public Integer getMaxDistance() {
		return maxDistance;
	}

	public void setMaxDistance(Integer maxDistance) {
		this.maxDistance = maxDistance;
	}
}