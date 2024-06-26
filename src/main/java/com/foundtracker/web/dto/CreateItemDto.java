package com.foundtracker.web.dto;

import com.foundtracker.web.model.Item;
import com.foundtracker.web.validator.ValidImageFiles;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class CreateItemDto {
    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 1, max = 255, message = "Name length must be between 1 and 255 characters")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be empty")
    @Size(max = 1000, message = "Description length cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Images cannot be null")
    @Size(min = 1, message = "Images cannot be empty")
    @ValidImageFiles
    List<MultipartFile> images;

    public static Item mapToDto(CreateItemDto createItemDto) {
        return Item.builder()
                .name(createItemDto.name)
                .description(createItemDto.description)
                .foundDateTime(LocalDateTime.now())
                .build();
    }
}
