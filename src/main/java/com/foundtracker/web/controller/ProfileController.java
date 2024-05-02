package com.foundtracker.web.controller;

import com.foundtracker.web.dto.ChangePasswordDto;
import com.foundtracker.web.dto.EditProfileDto;
import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.model.User;
import com.foundtracker.web.responses.ApiResponse;
import com.foundtracker.web.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@Tag(name = "Profile")
public class ProfileController {
    private final UserService service;

    @PatchMapping("/change-password")
    public ApiResponse<?> changePassword(
            @RequestBody @Valid  ChangePasswordDto request,
            Principal connectedUser) {
        service.changePassword(request, connectedUser);
        return ApiResponse.success(null,"Password Changed Successfully");
    }

    @PatchMapping("/update-info")
    public ApiResponse<?> updateInfo(
            @RequestBody @Valid EditProfileDto input
            ) {
        service.editProfile(input);
        return ApiResponse.success(null,"Profile Updated Successfully");
    }

    @GetMapping("/current-user")
    public ApiResponse<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ApiResponse.error("Couldn't load current user");
        }
        user.setTokens(null);
        return ApiResponse.success(UserDto.mapToUserDto(user), "Current user details retrieved successfully");
    }
}
