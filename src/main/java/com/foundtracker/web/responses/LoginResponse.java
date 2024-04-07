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
  @JsonProperty("access_token")
  private String accessToken;
  @JsonProperty("refresh_token")
  private String refreshToken;
}
