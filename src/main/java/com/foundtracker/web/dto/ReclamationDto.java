package com.foundtracker.web.dto;

import java.util.List;

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
    private String sujet;
    private String description;
    private String code;
    private ItemDto item;
    @Builder.Default
    private ReclamationStatus status = ReclamationStatus.PENDING;
    private UserDto user;
    private List<DocumentDto> docs;

    public static ReclamationDto mapToDto(Reclamation reclamation) {
        return ReclamationDto.builder()
                .id(reclamation.getId())
                .status(reclamation.getStatus())
                .sujet(reclamation.getSujet())
                .code(reclamation.getCode())
                .description(reclamation.getDescription())
                .item(ItemDto.mapToDto(reclamation.getItem()))
                .user(UserDto.mapToUserDto(reclamation.getUser()))
                .docs(reclamation.getDocs().stream().map(it -> DocumentDto.mapToDto(it)).toList())
                .build();
    }
}
