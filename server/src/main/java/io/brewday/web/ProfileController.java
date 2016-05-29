package io.brewday.web;

import io.brewday.domain.WaterProfile;
import io.brewday.domain.WaterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private WaterProfileRepository repository;

    @GetMapping("/")
    public Page<WaterProfile> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @GetMapping("/:id")
    public WaterProfile get(@PathVariable("id") WaterProfile waterProfile) {
        return waterProfile;
    }


}
