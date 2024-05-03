package com.foundtracker.web.dto;

import com.foundtracker.web.enums.ReclamationStatus;

import com.foundtracker.web.model.Reclamation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Reclamation")
public class ReclamationDto {
    private long id;
    private ReclamationStatus status = ReclamationStatus.PENDING;
    private ItemDto item;
    private UserDto user;

    public static ReclamationDto mapToDto(Reclamation reclamation) {
        return ReclamationDto.builder()
                .id(reclamation.getId())
                .status(reclamation.getStatus())
                .item(ItemDto.mapToDto(reclamation.getItem()))
                .user(UserDto.mapToUserDto(reclamation.getUser()))
                .build();
    }
}
