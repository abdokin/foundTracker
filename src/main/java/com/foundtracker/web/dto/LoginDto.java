package com.foundtracker.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "LoginInput")
public class LoginDto {
  @NotEmpty(message = "email is required")
  @Email
  private String email;
  @NotEmpty(message = "password is required")
  private String password;
}
