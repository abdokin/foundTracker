package com.foundtracker.web.requests;

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
public class LoginRequest {

  @NotEmpty(message = "email is required")
  @Email
  private String email;
  @NotEmpty(message = "password is required")
  private String password;
}
