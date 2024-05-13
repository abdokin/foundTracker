package com.foundtracker.web.controller;

import com.foundtracker.web.dto.ChangePasswordDto;
import com.foundtracker.web.dto.EditProfileDto;
import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.exception.FieldsNotMatch;
import com.foundtracker.web.exception.IncorrectPasswordException;
import com.foundtracker.web.exception.UnauthorizedException;
import com.foundtracker.web.model.User;
import com.foundtracker.web.responses.ErrorResponse;
import com.foundtracker.web.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@Tag(name = "Profile")
public class ProfileController {
    private final UserService userService;

    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody @Valid ChangePasswordDto request,
            @AuthenticationPrincipal User user) throws IncorrectPasswordException, FieldsNotMatch {
        userService.changePassword(request);
        return ResponseEntity.ok("Password chnaged");
    }

    @PatchMapping("/update-info")
    public ResponseEntity<UserDto> updateInfo(@RequestBody @Valid EditProfileDto input,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.editProfile(input));
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            throw new UnauthorizedException("Not authenticated.");
        }
        UserDto userDto = UserDto.mapToUserDto(user);
        return ResponseEntity.ok(userDto);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + ex.getMessage());
    }

    @ExceptionHandler({ IncorrectPasswordException.class })
    public ResponseEntity<ErrorResponse> handleIncorrectPasswordException(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler({ FieldsNotMatch.class })
    public ResponseEntity<ErrorResponse> handleFieldsNotMatch(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.error(e.getMessage());
        errorResponse.addValidationError("confirmationPassword", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
