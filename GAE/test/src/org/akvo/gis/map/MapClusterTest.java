package org.akvo.gis.map;

import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;

public class MapClusterTest extends TestCase {

	@Before
	protected void setUp() throws Exception {
		super.setUp();
	}

	@Test
	public void testCentreForMapClusterWithSingleGeoLocationEqualsInitialGeoLocation() {
		fail("Not yet implemented");
	}
	
	@Test
	public void testCentreForMapClusterWithMultipleGeoLocationsEqualsWeightedAverageGeoLocation() {
		fail("Not yet implemented");
	}

	@Test
	public void testClusterCentreIsUpdatedWhenNewGeoLocationsIsAdded() {
		fail("Not yet implemented");
	}
	
	@Test
	public void testClusterCentreIsUpdatedWhenExistingGeoLocationsIsRemoved() {
		fail("Not yet implemented");
	}
	

	/*
	 * Scenarios:
	 * 	- initial map cluster contains single point
	 *  - can add multiple points
	 *  - can remove multiple points
	 *  - centre calc updates only on insertion or removal of geo locations
	 */
}
