package io.brewday.beerxml;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import java.util.Collections;
import java.util.List;

@JsonRootName("WATERS")
public class BeerXmlDocument {

    @JacksonXmlProperty(localName = "WATER")
    private final List<BeerXmlWater> waters;

    public BeerXmlDocument(List<BeerXmlWater> waters) {
        this.waters = waters;
    }

    public BeerXmlDocument(BeerXmlWater water) {
        this.waters = Collections.singletonList(water);
    }

}
