package com.foundtracker.web.controller;

import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.responses.ApiResponse;
import com.foundtracker.web.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public ApiResponse<Page<UserDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<UserDto> users = userService.getAll(PageRequest.of(page, size));
        return ApiResponse.success(users,"Users Loaded Successfully");
    }
}
