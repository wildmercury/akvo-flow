package org.akvo.gis.map;

import junit.framework.TestCase;
import static org.assertj.core.api.Assertions.*;

import org.junit.Before;
import org.junit.Test;

import org.akvo.gis.map.ClusteringCalculator;

public class ClusteringCalculatorTest extends TestCase {

	private ClusteringCalculator calculator;
	
	@Before
	public void setUp() throws Exception {
		calculator = new ClusteringCalculator();
	}

	@Test
	public void testHasExpectedGeoCellConstants() {
		assertThat(ClusteringCalculator.GEO_CELL_MAX_RESOLUTION).isEqualTo(4);
		fail("in progress");
	}
}
