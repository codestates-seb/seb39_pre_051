package com.codestates.pre51;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Pre51Application {

	public static void main(String[] args) {
		SpringApplication.run(Pre51Application.class, args);
	}

}
