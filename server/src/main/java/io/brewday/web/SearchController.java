package io.brewday.web;

import io.brewday.domain.WaterProfile;
import io.brewday.domain.WaterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    @Autowired
    private WaterProfileRepository waterProfileRepository;

    @PostMapping("/search")
    public List<WaterProfile> search(@RequestBody String term) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matchingAny(term);
        return waterProfileRepository.findAllBy(criteria);
    }
}
