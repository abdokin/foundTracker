package com.foundtracker.web.controller;


import com.foundtracker.web.requests.LoginRequest;
import com.foundtracker.web.service.AuthenticationService;
import com.foundtracker.web.requests.RegisterRequest;
import com.foundtracker.web.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  @ResponseStatus(code = HttpStatus.ACCEPTED)
  public ApiResponse register(@RequestBody @Valid RegisterRequest request) {
    return ApiResponse.success(service.register(request),"User register successfully");
  }
  @PostMapping("/authenticate")
  @ResponseStatus(code = HttpStatus.OK)
  public ApiResponse authenticate(@RequestBody @Valid LoginRequest request) {
    return ApiResponse.success(service.authenticate(request),"Welcome Back");
  }

  @PostMapping("/refresh-token")
  @ResponseStatus(code = HttpStatus.OK)
  public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
    service.refreshToken(request, response);
  }
}
