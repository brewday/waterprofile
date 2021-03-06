package io.brewday.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.data.repository.init.Jackson2RepositoryPopulatorFactoryBean;

@Configuration
@Profile("!production")
public class MongoDataConfig {

    private static final Logger log = LoggerFactory.getLogger(MongoDataConfig.class);

    @Autowired
    ObjectMapper jsonMapper;

    @Autowired
    ResourcePatternResolver resourceResolver;

    @Bean
    public Jackson2RepositoryPopulatorFactoryBean jackson2RepositoryPopulatorFactory() {
        Jackson2RepositoryPopulatorFactoryBean b = new Jackson2RepositoryPopulatorFactoryBean();
        try {
            b.setMapper(jsonMapper);
            b.setResources(resourceResolver.getResources("classpath:data/*.json"));
            b.afterPropertiesSet();
        } catch (Exception e) {
            log.error("Could not load data", e);
        }

        return b;
    }
}
