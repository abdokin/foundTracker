package com.foundtracker.web.service;

import com.foundtracker.web.dto.NotificationDto;
import com.foundtracker.web.model.Notification;
import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    public void send(String message, Reclamation reclamation) {
        Notification notification = Notification.builder()
                .message(message)
                .user(reclamation.user)
                .reclamation(reclamation)
                .build();
        notificationRepository.save(notification);
        messagingTemplate.convertAndSend("/notification/" + reclamation.user.getId(), notification);
        NotificationDto.mapToDto(notification);
    }

    public NotificationDto findById(int notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow();
        return NotificationDto.mapToDto(notification);
    }

    public Page<NotificationDto> getCurrentUserNotification(Pageable pageable) {
        Page<Notification> notifications = notificationRepository.findAllByUser(userService.getCurrentUser(),pageable);
        return notifications.map(NotificationDto::mapToDto);
    }

    public Page<NotificationDto> getReclamationNotification(Pageable pageable,long reclamationId) {
        Page<Notification> notifications = notificationRepository
                .findByUserAndReclamationId(userService.getCurrentUser(),reclamationId,pageable);
        return notifications.map(NotificationDto::mapToDto);
    }
}
