package io.brewday.converter;

import io.brewday.domain.WaterProfile;
import io.brewday.domain.WaterProfileRepository;
import io.brewday.web.exception.ProfileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToWaterProfileConverter implements Converter<String, WaterProfile> {

    private final WaterProfileRepository repository;

    @Autowired
    public StringToWaterProfileConverter(WaterProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public WaterProfile convert(String id) {

        WaterProfile t = repository.findOne(id);
        if (t == null) {
            throw new ProfileNotFoundException();
        }

        return t;
    }
}
