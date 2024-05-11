package com.foundtracker.web.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.foundtracker.web.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
  @JsonProperty("user")
  UserDto user;
  @JsonProperty("token")
  private String token;
}
