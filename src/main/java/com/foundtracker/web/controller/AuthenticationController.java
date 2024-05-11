package com.foundtracker.web.controller;

import com.foundtracker.web.dto.LoginDto;
import com.foundtracker.web.dto.RegisterDto;
import com.foundtracker.web.responses.LoginResponse;
import com.foundtracker.web.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody @Valid RegisterDto request) {
    service.register(request);
    return ResponseEntity.ok("User register successfully");
  }

  @PostMapping("/authenticate")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid LoginDto request) {
    return ResponseEntity.ok(service.authenticate(request));
  }
}
