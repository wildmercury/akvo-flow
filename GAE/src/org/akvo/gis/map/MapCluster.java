package org.akvo.gis.map;

public class MapCluster {

    private ClusteringCalculator calculator;
    private long locationCount;
    private MapLocation clusterCentre;

    public MapCluster(ClusteringCalculator calc) {
        calculator = calc;
        locationCount = 0;
        clusterCentre = MapLocation.ORIGIN;
    }

    public void addLocation(MapLocation newlocation) {
        if (isEmpty()) {
            clusterCentre = newlocation;
        }

        locationCount++;
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
}
