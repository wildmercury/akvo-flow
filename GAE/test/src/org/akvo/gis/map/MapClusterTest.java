package org.akvo.gis.map;

import static org.assertj.core.api.Assertions.assertThat;
import junit.framework.TestCase;

import org.junit.Before;
import org.junit.Test;

public class MapClusterTest extends TestCase {

    private MapLocation mapLocation1;
    private MapLocation mapLocation2;
    private MapLocation mapLocation3;

    private MapCluster emptyMapCluster;

    @Before
    protected void setUp() throws Exception {
        mapLocation1 = new MapLocation(50d, 2d);
        mapLocation2 = new MapLocation(0.02, -0.002);
        mapLocation3 = new MapLocation(44.00002, -22.000345);

        emptyMapCluster = new MapCluster();
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
    public void testClusterLocationCountShouldMatchNumberOfAddedMapLocations() {
        MapCluster mapCluster = emptyMapCluster;
        assertThat(mapCluster.getLocationCount()).isEqualTo(0);

        mapCluster.addLocation(mapLocation1);
        assertThat(mapCluster.getLocationCount()).isEqualTo(1);

        mapCluster.addLocation(mapLocation2);
        mapCluster.addLocation(mapLocation3);
        assertThat(mapCluster.getLocationCount()).isEqualTo(3);
    }

    @Test
    public void testClusterCentreShouldBeUpdatedWhenAddingMapLocations() {
        MapCluster mapCluster = emptyMapCluster;

        mapCluster.addLocation(mapLocation1);
        assertThat(mapCluster.getCentre()).isEqualTo(mapLocation1);

        mapCluster.addLocation(mapLocation2);
        assertThat(mapCluster.getCentre()).isEqualTo(expectedCentreAfterAddingSecondLocation());

        mapCluster.addLocation(mapLocation3);
        assertThat(mapCluster.getCentre()).isEqualTo(expectedCentreAfterAddingThirdLocation());
    }

    private MapLocation expectedCentreAfterAddingSecondLocation() {
        MapCluster mapCluster = emptyMapCluster;
        mapCluster.addLocation(mapLocation1);

        return new MapLocation(newLatitudeCentreWith(mapLocation2, mapCluster), newLongitudeCentreWith(mapLocation2, mapCluster));
    }

    private MapLocation expectedCentreAfterAddingThirdLocation() {
        MapCluster mapCluster = emptyMapCluster;
        mapCluster.addLocation(mapLocation1);
        mapCluster.addLocation(mapLocation2);

        return new MapLocation(newLatitudeCentreWith(mapLocation3, mapCluster), newLongitudeCentreWith(mapLocation3, mapCluster));
    }

    private double newLatitudeCentreWith(MapLocation locationToAdd, MapCluster mapCluster) {
        long locationCount = mapCluster.getLocationCount();
        return mapCluster.getCentre().getLatitude() * locationCount + mapLocation1.getLatitude() / (locationCount + 1);
    }

    private double newLongitudeCentreWith(MapLocation locationToAdd, MapCluster mapCluster) {
        long locationCount = mapCluster.getLocationCount();
        return mapCluster.getCentre().getLongitude() * locationCount + mapLocation1.getLongitude() / (locationCount + 1);
    }

    @Test
    public void testClusterCentreShouldBeUpdatedWhenRemovingMapLocations() {
        fail("to do");
    }

    @Test
    public void testHasExpectedGeoCellConstants() {
        assertThat(MapCluster.GEO_CELL_MAX_RESOLUTION).isEqualTo(4);
    }
}
