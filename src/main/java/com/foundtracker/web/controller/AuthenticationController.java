package com.foundtracker.web.controller;

import com.foundtracker.web.dto.LoginDto;
import com.foundtracker.web.dto.RegisterDto;
import com.foundtracker.web.responses.LoginResponse;
import com.foundtracker.web.service.AuthenticationService;
import com.foundtracker.web.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ApiResponse<?> register(@RequestBody @Valid RegisterDto request) {
    service.register(request);
    return ApiResponse.success(null,"User register successfully");
  }
  @PostMapping("/authenticate")
  public ApiResponse<LoginResponse> authenticate(@RequestBody @Valid LoginDto request) {
    return ApiResponse.success(service.authenticate(request),"Welcome Back");
  }
}
