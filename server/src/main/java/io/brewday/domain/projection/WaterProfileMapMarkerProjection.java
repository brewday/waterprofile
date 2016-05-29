package io.brewday.domain.projection;

import org.springframework.data.geo.Point;

/**
 * Projection that only returns whats needed for Map points
 */
public interface WaterProfileMapMarkerProjection {

    String getCity();
    String getTreatmentPlant();
    Point getPosition();

}
