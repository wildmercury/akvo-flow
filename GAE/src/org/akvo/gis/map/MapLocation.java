package org.akvo.gis.map;

public class MapLocation {

    private double latitude;
    private double longitude;

    public MapLocation(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    @Override
    public boolean equals(Object obj) {
        if ((obj != null) && (obj instanceof MapLocation)) {
            MapLocation other = (MapLocation) obj;

            return (latitude == other.latitude)
                    && (longitude == other.longitude);
        } else
            return false;
    }
}
