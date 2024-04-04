package com.foundtracker.web.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
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
public class ApiResponse {
    private boolean success;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
    private String stackTrace;
    private List<ValidationError> errors;
    private Object data;

    public static ApiResponse empty(String message) {
        return success(null,message);
    }

    public static ApiResponse success(Object data, String message) {
        return ApiResponse.builder()
                .message(message)
                .timestamp(LocalDateTime.now())
                .data(data)
                .success(true)
                .build();
    }


    private record ValidationError(String field, String message) { }

    public void addValidationError(String field, String message) {
        if (Objects.isNull(errors)) {
            errors = new ArrayList<>();
        }
        errors.add(new ValidationError(field, message));
    }

    public static ApiResponse error(String message) {
        return ApiResponse.builder()
                .message(message)
                .timestamp(LocalDateTime.now())
                .success(false)
                .build();
    }
}
