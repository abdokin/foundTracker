package com.foundtracker.web.dto;

import com.foundtracker.web.model.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Schema(name = "Notification")
public class NotificationDto {
    private int id;
    private String message;
    private LocalDateTime receivedAt;
    private ReclamationDto reclamationDto;
    public  static NotificationDto mapToDto(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .receivedAt(notification.getReceivedAt())
                .reclamationDto(ReclamationDto.mapToDto(notification.getReclamation()))
                .build();
    }
}
