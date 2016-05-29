package io.brewday.domain;

import io.brewday.domain.projection.WaterProfileMapMarkerProjection;
import org.springframework.data.geo.Box;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface WaterProfileRepository extends MongoRepository<WaterProfile, String> {

    List<WaterProfileMapMarkerProjection> findByArchivedFalse();

    List<WaterProfile> findByPositionWithin(Circle c);

    List<WaterProfile> findByPositionWithin(Box b);

    List<WaterProfile> findByPositionNear(Point p, Distance d);

    List<WaterProfile> findAllBy(TextCriteria criteria);
}