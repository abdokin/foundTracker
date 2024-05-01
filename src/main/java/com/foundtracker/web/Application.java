package com.foundtracker.web;

import com.foundtracker.web.dto.RegisterDto;
import com.foundtracker.web.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.foundtracker.web.model.Role.ADMIN;
import static com.foundtracker.web.model.Role.USER;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
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
			service.registerIfNotExist(admin, ADMIN);

			var manager = RegisterDto.builder()
					.firstname("Manager")
					.lastname("Admin")
					.email("manager@mail.com")
					.password("password")
					.build();
			service.registerIfNotExist(manager, USER);

		};
	}
}
