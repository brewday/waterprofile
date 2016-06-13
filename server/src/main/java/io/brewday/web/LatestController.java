package io.brewday.web;

import io.brewday.domain.WaterProfile;
import io.brewday.domain.WaterProfileRepository;
import io.brewday.domain.WaterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class LatestController {

    @Autowired
    private WaterProfileService waterProfileService;

    @GetMapping(path = "/latest", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<WaterProfile> latest() {
        return waterProfileService.findLatest();
    }

}
