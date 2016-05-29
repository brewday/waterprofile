package io.brewday.converter;

import io.brewday.beerxml.BeerXmlDocument;
import io.brewday.beerxml.BeerXmlWater;
import io.brewday.domain.WaterProfile;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class WaterProfileToBeerXml implements Converter<WaterProfile, BeerXmlDocument> {

    @Override
    public BeerXmlDocument convert(WaterProfile source) {
        BeerXmlWater w = new BeerXmlWater();
        w.setName(source.getCity());
        w.setVersion(1);
        w.setNotes(source.getNotes());
        w.setPh(source.getPh());
        w.setCalcium(source.getCa());
        w.setBicarbonate(source.getHc03());
        w.setSulfate(source.getS04());
        w.setChloride(source.getCl());
        w.setSodium(source.getNa());
        w.setMagnesium(source.getMg());

        return new BeerXmlDocument(w);
    }

}
