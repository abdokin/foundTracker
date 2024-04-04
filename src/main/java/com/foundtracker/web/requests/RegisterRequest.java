package com.foundtracker.web.requests;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  @NotBlank(message = "First name is required")
  private String firstname;
  @NotBlank(message = "Last name is required")
  private String lastname;
  @NotEmpty(message = "email is required")
  @Email
  private String email;
  @NotEmpty(message = "password is required")
  @Size(min = 3,max = 30,message = "password must be between 3 and 30 character")

  private String password;
}
