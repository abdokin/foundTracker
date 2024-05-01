package com.foundtracker.web.dto;

import com.foundtracker.web.model.Item;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Builder
@Data
public class EditItemDto {

        long id;
        @NotNull(message = "Name cannot be null")
        @Size(min = 1, max = 255, message = "Name length must be between 1 and 255 characters")
        private String name;

        @NotNull(message = "Description cannot be null")
        @Size(max = 1000, message = "Description length cannot exceed 1000 characters")
        private String description;

        @NotNull(message = "Found date and time cannot be null")
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime foundDateTime;


}
