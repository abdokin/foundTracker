package com.foundtracker.web;

import com.foundtracker.web.dto.RegisterDto;
import com.foundtracker.web.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.foundtracker.web.model.Role.RECEPTIONNAIRE;
import static com.foundtracker.web.model.Role.USER;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			var admin = RegisterDto.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@mail.com")
					.password("password")
					.build();
			service.registerIfNotExist(admin, RECEPTIONNAIRE);

			var manager = RegisterDto.builder()
					.firstname("USER")
					.lastname("Admin")
					.email("client@mail.com")
					.password("password")
					.build();
			service.registerIfNotExist(manager, USER);

		};
	}
}
