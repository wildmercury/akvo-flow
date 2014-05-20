package org.akvo.gis.map;

public class MapCluster {

    static public final int GEO_CELL_MAX_RESOLUTION = 4;

    private long locationCount;
    private MapLocation clusterCentre;

    public MapCluster() {
        locationCount = 0;
        clusterCentre = MapLocation.ORIGIN;
    }

    public long getLocationCount() {
        return locationCount;
    }

    public MapLocation getCentre() {
        return clusterCentre;
    }

    public boolean isEmpty() {
        return locationCount == 0;
    }

    public boolean isNotEmpty() {
        return locationCount > 0;
    }

    public void addLocation(MapLocation newLocation) {
        if (isEmpty()) {
            clusterCentre = newLocation;
        } else {
            clusterCentre = new MapLocation(recentreLatitudeWith(newLocation), recentreLongitudeWith(newLocation));
        }

        locationCount++;
    }

    private double recentreLatitudeWith(MapLocation newLocation) {
        return clusterCentre.getLatitude() * locationCount + newLocation.getLatitude() / (locationCount + 1);
    }

    private double recentreLongitudeWith(MapLocation newLocation) {
        return clusterCentre.getLongitude() * locationCount + newLocation.getLongitude() / (locationCount + 1);
    }
}
