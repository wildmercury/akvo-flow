package org.akvo.gis.map;

public class MapLocation {

    private double latitude;
    private double longitude;

    static public final MapLocation ORIGIN = new MapLocation(0d, 0d);

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

    public boolean isOrigin() {
        return equals(ORIGIN);
    }

    public boolean isNotOrigin() {
        return !isOrigin();
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
