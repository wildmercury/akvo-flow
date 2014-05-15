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
    public void testNewMapClusterHasOriginAsCentre() {
        assertThat(emptyMapCluster.getCentre().isOrigin()).isTrue();
    }

    @Test
    public void testNewMapClusterIsEmpty() {
        assertThat(emptyMapCluster.isEmpty()).isTrue();
    }

    @Test
    public void testCanAddMapLocationToCluster() {
        MapCluster mapCluster = emptyMapCluster;
        mapCluster.addLocation(mapLocation1);

        assertThat(mapCluster.isNotEmpty()).isTrue();
    }

    @Test
    public void testCentreForMapClusterWithSingleLocationShouldEqualFirstLocation() {
        createSingleLocationMapCluster();

        assertThat(singleLocationMapCluster.getCentre()).isEqualTo(mapLocation1);
    }

    @Test
    public void testCentreForMapClusterWithMultipleLocationsShouldEqualAverageCentreOfAllLocations() {
        createMultiLocationMapCluster();

        // assertThat(multiLocationMapCluster.getCentre()).isEqualTo(expectedMultiClusterCentre());
        fail("in progres");
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
     * Scenarios: - initial map cluster contains single point - can add multiple
     * points - can remove multiple points - centre calc updates only on
     * insertion or removal of geo locations
     * 
     * - MapCluster depends on a ClusteringCalculator
     */
}
