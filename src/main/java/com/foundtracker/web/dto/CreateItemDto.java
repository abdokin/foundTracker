package com.foundtracker.web.dto;

import com.foundtracker.web.model.Item;
import com.foundtracker.web.validator.ImageFiles;
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
    @Size(min = 1, max = 255, message = "Name length must be between 1 and 255 characters")
    private String name;

    @NotNull(message = "Description cannot be null")
    @Size(max = 1000, message = "Description length cannot exceed 1000 characters")
    private String description;

    @ImageFiles
    List<MultipartFile> images;
    public  static Item mapToItem(CreateItemDto createItemDto) {
        return Item.builder()
                .name(createItemDto.name)
                .description(createItemDto.description)
                .foundDateTime(LocalDateTime.now())
                .build();
    }
}
