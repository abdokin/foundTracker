package com.foundtracker.web.controller;

import com.foundtracker.web.dto.NotificationDto;
import com.foundtracker.web.model.Notification;
import com.foundtracker.web.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
@Tag(name = "Notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<Page<NotificationDto>> getAllNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<NotificationDto> notifications = notificationService
                .getCurrentUserNotification(PageRequest.of(page, size));

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/{notifcationId}/open")
    public ResponseEntity<NotificationDto> readNotification(@PathVariable int notifcationId) {
       
        return ResponseEntity.ok( notificationService.read(notifcationId));
    }

    @GetMapping("/{reclamationId}")
    public ResponseEntity<Page<NotificationDto>> getAllReclamationNotifications(
            @PathVariable Long reclamationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<NotificationDto> notifications = notificationService.getReclamationNotification(PageRequest.of(page, size),
                reclamationId);

        return ResponseEntity.ok(notifications);
    }

    @MessageMapping("/notification/{userId}")
    @SendTo("/topic/notification/{userId}")
    public Notification handleNotification(@DestinationVariable String userId, @Payload Notification notification) {
        System.out.println(notification);
        return notification;
    }

}
