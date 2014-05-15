package org.akvo.gis.map;

public class MapCluster {

    private ClusteringCalculator calculator;
    private MapLocation clusterCentre;

    public MapCluster(ClusteringCalculator calc) {
        calculator = calc;
        clusterCentre = MapLocation.ORIGIN;
    }

    public void addLocation(MapLocation newlocation) {
        if (isEmpty()) {
            clusterCentre = newlocation;
        }
    }

    public MapLocation getCentre() {
        return clusterCentre;
    }

    public boolean isEmpty() {
        return clusterCentre.isOrigin();
    }

    public boolean isNotEmpty() {
        return clusterCentre.isNotOrigin();
    }

    public boolean isDisplayable() {
        return isNotEmpty();
    }
}
