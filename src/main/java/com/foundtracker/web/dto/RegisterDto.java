package com.foundtracker.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.foundtracker.web.model.Role;
import com.foundtracker.web.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    @NotBlank(message = "First name is required")
    private String firstname;
    @NotBlank(message = "Last name is required")
    private String lastname;
    @NotEmpty(message = "email is required")
    @Email
    private String email;
    @NotBlank(message = "password is required")
    @Size(min = 3, max = 30, message = "password must be between 3 and 30 characters")
    private String password;
    public static User mapToUser(RegisterDto registerDto) {
        return User.builder()
                .firstname(registerDto.getFirstname())
                .lastname(registerDto.getLastname())
                .email(registerDto.getEmail())
                .password(registerDto.getPassword())
                .build();
    }
}
