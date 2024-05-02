package com.foundtracker.web.exception;

import com.foundtracker.web.responses.ApiResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class GlobalExceptionHandler  {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        ApiResponse<?> errorResponse = ApiResponse.error("Validation Error");
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = null;
            String errorMessage = null;
            if (error instanceof FieldError) {
                fieldName = ((FieldError) error).getField();
                errorMessage = error.getDefaultMessage();
            }
            if (fieldName != null && fieldName.equals("images")) {
                errorMessage = "Invalid image format or no images provided";
            }
            errorResponse.addValidationError(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException e) {
        ApiResponse<?> errorResponse = ApiResponse.error("Bad Credentials" + e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        return new ResponseEntity<>(ApiResponse.error(e.toString()),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        String errorMessage = e.getMessage();
        String fieldName = extractFieldName(errorMessage);
        ApiResponse<?> apiResponse =ApiResponse.error("Validation Error");
        apiResponse.addValidationError(fieldName,fieldName+" already exists");
        return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
    }

    public static String extractFieldName(String errorMessage) {
        Pattern pattern = Pattern.compile("Key \\((.*?)\\)");
        Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
