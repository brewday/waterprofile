package io.brewday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class WaterprofileApplication {

	public static void main(String[] args) {
		SpringApplication.run(WaterprofileApplication.class, args);
	}
}
