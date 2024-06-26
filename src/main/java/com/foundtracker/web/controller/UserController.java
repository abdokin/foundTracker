package com.foundtracker.web.controller;

import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/management/users")
@RequiredArgsConstructor
@Tag(name = "User Management")
public class UserController {
    final UserService userService;

    @GetMapping("/")
    @PreAuthorize("hasRole('ROLE_RECEPTIONNAIRE')")
    public ResponseEntity<Page<UserDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserDto> users = userService.getAllUsers(PageRequest.of(page, size));
        return ResponseEntity.ok(users);
    }
}
