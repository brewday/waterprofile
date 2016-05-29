package io.brewday.web;

import io.brewday.domain.WaterProfileRepository;
import io.brewday.domain.projection.WaterProfileMapMarkerProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/map")
public class MapController {

    @Autowired
    private WaterProfileRepository repository;

    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private List<WaterProfileMapMarkerProjection> points() {
        return repository.findByArchivedFalse();
    }
}
