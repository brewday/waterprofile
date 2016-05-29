package io.brewday.web;

import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import io.brewday.beerxml.BeerXmlDocument;
import io.brewday.domain.WaterProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExportController {

    private XmlMapper xmlMapper;

    private ConversionService conversionService;

    @Autowired
    public ExportController(ConversionService conversionService) {
        this.conversionService = conversionService;

        JacksonXmlModule module = new JacksonXmlModule();
        module.setDefaultUseWrapper(false);
        xmlMapper = new XmlMapper(module);
    }

    @GetMapping(path = "/profiles/:id/beerxml", produces = MediaType.TEXT_XML_VALUE)
    public BeerXmlDocument beerXmlExport(@PathVariable("id") WaterProfile waterProfile) {

        BeerXmlDocument doc = conversionService.convert(waterProfile, BeerXmlDocument.class);

        //response.setHeader("Content-Disposition", "attachment; filename=somefile.pdf");

        return doc;
    }
}
