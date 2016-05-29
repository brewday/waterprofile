package io.brewday.beerxml;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ConvertTests {

    //@Autowired
    private XmlMapper mapper;

    private BeerXmlDocument document;
    private BeerXmlWater water;

    @Before
    public void before() {
        JacksonXmlModule module = new JacksonXmlModule();
        module.setDefaultUseWrapper(false);
        mapper = new XmlMapper(module);

        water = new BeerXmlWater();
        water.setPh(7.2);

        document = new BeerXmlDocument(water);
    }


    @Test
    public void shouldConvertToXml() throws JsonProcessingException {
        String xml = mapper.writeValueAsString(document);
        assertNotNull(xml);
    }
}
