package com.foundtracker.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import com.foundtracker.web.validator.ValidDocuments;

import java.util.List;

@Builder
@Data
public class CreateReclamationDto {
    @NotNull(message = "Sujet cannot be null")
    @NotBlank(message = "Sujet cannot be empty")
    @Size(min = 1, max = 255, message = "Sujet length must be between 1 and 255 characters")
    private String sujet;

    private Long itemId;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be empty")
    @Size(max = 1000, message = "Description length cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Docs cannot be null")
    @Size(min = 1, message = "Docs cannot be empty")
    @ValidDocuments
    List<MultipartFile> docs;

}
