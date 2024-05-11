package com.foundtracker.web.service;

import com.foundtracker.web.dto.RegisterDto;
import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.config.JwtService;
import com.foundtracker.web.dto.LoginDto;
import com.foundtracker.web.responses.LoginResponse;
import com.foundtracker.web.model.Role;
import com.foundtracker.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public void register(RegisterDto request) {
    registerWithRole(request, Role.USER);
  }

  public void registerIfNotExist(RegisterDto request, Role role) {
    if (repository.findByEmail(request.getEmail()).isEmpty()) {
      registerWithRole(request, role);
    }

  }

  public void registerWithRole(RegisterDto request, Role role) {
    var user = RegisterDto.mapToDto(request);
    user.setRole(role);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    repository.save(user);
  }

  public LoginResponse authenticate(LoginDto request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);

    return LoginResponse.builder()
        .token(jwtToken)
        .user(UserDto.mapToUserDto(user))
        .build();
  }

}
