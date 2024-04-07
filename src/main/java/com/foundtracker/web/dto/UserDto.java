package com.foundtracker.web.dto;

import com.foundtracker.web.model.Role;
import com.foundtracker.web.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Integer id;

    @NotBlank(message = "First name is required")
    private String firstname;
    @NotBlank(message = "Last name is required")
    private String lastname;
    @NotEmpty(message = "email is required")
    @Email
    private String email;
    private Role role;
    public Collection<? extends GrantedAuthority> authorities;
    public boolean isEnabled;


    public static UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .isEnabled(user.isEnabled())
                .authorities(user.getAuthorities())
                .build();
    }

}
