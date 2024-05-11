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
@Schema(name = "ErrorResponse")
public class ErrorResponse {
    private String message;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    private List<ValidationError> errors;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ValidationError {
        private String field;
        private String message;
    }

    public void addValidationError(String field, String message) {
        if (Objects.isNull(errors)) {
            errors = new ArrayList<>();
        }
        errors.add(new ValidationError(field, message));
    }

    public static ErrorResponse error(String message) {
        return ErrorResponse.builder()
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
