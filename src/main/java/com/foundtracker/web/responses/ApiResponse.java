package com.foundtracker.web.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name="ApiResponse")
public class ApiResponse<T> {
    @Builder.Default
    private boolean success = false;
    private String message;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    private List<ValidationError> errors;
    private T data;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ValidationError {
        private String field;
        private String message;
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .message(message)
                .timestamp(LocalDateTime.now())
                .data(data)
                .success(true)
                .build();
    }

    public void addValidationError(String field, String message) {
        if (Objects.isNull(errors)) {
            errors = new ArrayList<>();
        }
        errors.add(new ValidationError(field, message));
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .message(message)
                .timestamp(LocalDateTime.now())
                .success(false)
                .build();
    }
}
