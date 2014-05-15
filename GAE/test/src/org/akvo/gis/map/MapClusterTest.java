package org.akvo.gis.map;

import static org.assertj.core.api.Assertions.assertThat;
import junit.framework.TestCase;

import org.junit.Before;
import org.junit.Test;

public class MapClusterTest extends TestCase {

    private ClusteringCalculator clusteringCalculator;

    private MapLocation mapLocation1;
    private MapLocation mapLocation2;
    private MapLocation mapLocation3;

    private MapCluster emptyMapCluster;
    private MapCluster singleLocationMapCluster;
    private MapCluster multiLocationMapCluster;

    @Before
    protected void setUp() throws Exception {
        clusteringCalculator = new ClusteringCalculator();

        mapLocation1 = new MapLocation(50d, 2d);
        mapLocation2 = new MapLocation(0.02, -0.002);
        mapLocation3 = new MapLocation(44.00002, -22.000345);

        emptyMapCluster = new MapCluster(clusteringCalculator);
    }

    private void createMultiLocationMapCluster() {
        multiLocationMapCluster = new MapCluster(clusteringCalculator);
        multiLocationMapCluster.addLocation(mapLocation1);
        multiLocationMapCluster.addLocation(mapLocation2);
        multiLocationMapCluster.addLocation(mapLocation3);
    }

    private void createSingleLocationMapCluster() {
        singleLocationMapCluster = new MapCluster(clusteringCalculator);
        singleLocationMapCluster.addLocation(mapLocation1);
    }

    @Test
    public void testNewMapClusterIsEmpty() {
        assertThat(emptyMapCluster.getLocationCount()).isEqualTo(0);
        assertThat(emptyMapCluster.isEmpty()).isTrue();
    }

    @Test
    public void testNewMapClusterHasOriginAsCentre() {
        assertThat(emptyMapCluster.getCentre().isOrigin()).isTrue();
    }

    @Test
    public void testAddingMapLocationsToClusterShouldRecalculateClusterCentre() {
        MapCluster mapCluster = emptyMapCluster;
        assertThat(mapCluster.isEmpty()).isTrue();

        mapCluster.addLocation(mapLocation1);
        assertThat(mapCluster.isNotEmpty()).isTrue();
        assertThat(mapCluster.getLocationCount()).isEqualTo(1);

        mapCluster.addLocation(mapLocation2);
        mapCluster.addLocation(mapLocation3);
        assertThat(mapCluster.isNotEmpty()).isTrue();
        assertThat(mapCluster.getLocationCount()).isEqualTo(3);
        
        fail("to still check centering recalculation");
    }

    @Test
    public void testRemovingMapLocationsFromClusterShouldRecalculateClusterCentre() {
        fail("to do");
    }

    @Test
    public void testClusterShouldNotBeDisplayableWhenEmpty() {
        assertThat(emptyMapCluster.isEmpty()).isTrue();
        assertThat(emptyMapCluster.isDisplayable()).isFalse();
    }

    @Test
    public void testClusterWithSingleLocationShouldBeDisplayable() {
        createSingleLocationMapCluster();

        assertThat(singleLocationMapCluster.isNotEmpty()).isTrue();
        assertThat(singleLocationMapCluster.isDisplayable()).isTrue();
    }

    @Test
    public void testClusterWithMultipleLocationsShouldBeDisplayable() {
        createMultiLocationMapCluster();

        assertThat(multiLocationMapCluster.isNotEmpty()).isTrue();
        assertThat(multiLocationMapCluster.isDisplayable()).isTrue();
    }
}
