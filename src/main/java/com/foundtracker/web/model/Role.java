package com.foundtracker.web.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Getter
@RequiredArgsConstructor
public enum Role {

  USER("USER"),
  RECEPTIONNAIRE("RECEPTIONNAIRE");
  //ADMIN("ADMIN"),
  //MANAGER("MANAGER");

  private final String roleName;

  public List<SimpleGrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + roleName));
  }
}
