package org.akvo.gis.map;

import static org.assertj.core.api.Assertions.assertThat;
import junit.framework.TestCase;

import org.junit.Test;

public class MapLocationTest extends TestCase {

    @Test
    public void testEquality() {
        MapLocation location = new MapLocation(50d, 5d);
        MapLocation sameLocation = new MapLocation(50d, 5d);

        assertThat(location).isEqualTo(sameLocation);
    }

    @Test
    public void testInequality() {
        MapLocation location = new MapLocation(50d, 5d);
        MapLocation differentLocation = new MapLocation(30d, 3d);

        assertThat(location).isNotEqualTo(differentLocation);
    }

    @Test
    public void testHasOrigin() {
        assertThat(MapLocation.ORIGIN).isEqualTo(new MapLocation(0d, 0d));
    }

    @Test
    public void testCanRecogniseOrigin() {
        assertThat(MapLocation.ORIGIN.isOrigin()).isTrue();
        assertThat(new MapLocation(30d, 3d).isNotOrigin()).isTrue();
    }
}
