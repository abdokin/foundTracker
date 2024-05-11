package com.foundtracker.web.controller;

import com.foundtracker.web.dto.NotificationDto;
import com.foundtracker.web.responses.ApiResponse;
import com.foundtracker.web.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
@Tag(name = "Notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<Page<NotificationDto>> getAllNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<NotificationDto> notifications = notificationService.getCurrentUserNotification(PageRequest.of(page, size));

        return ApiResponse.success(notifications, "notifications loaded successfully");
    }

    @GetMapping("/{reclamationId}")
    public ApiResponse<Page<NotificationDto>> getAllReclamationNotifications(
            @PathVariable Long reclamationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<NotificationDto> notifications = notificationService.getReclamationNotification(PageRequest.of(page, size),reclamationId);

        return ApiResponse.success(notifications, "notifications loaded successfully");
    }


}

