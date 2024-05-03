package com.foundtracker.web.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "_user")
public class User implements UserDetails {
  @Id
  @GeneratedValue
  private Integer id;
  private String firstname;
  private String lastname;
  @Column(unique = true)
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
  private List<Token> tokens;

  @OneToMany(mappedBy = "user",fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private List<Item> items;
  @OneToMany(mappedBy = "user",fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  private List<Notification> notifications;
  @OneToMany(mappedBy = "user",fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  private List<Reclamation> reclamations;
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  @CreatedBy
  private String createdBy;

  @CreatedDate
  private Instant createdDate;

}
