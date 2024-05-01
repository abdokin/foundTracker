package com.foundtracker.web.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public class ImagesValidator implements ConstraintValidator<ImageFiles, List<MultipartFile>> {

    private static final List<String> ALLOWED_IMAGE_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"
    );

    @Override
    public void initialize(ImageFiles constraintAnnotation) {
    }

    @Override
    public boolean isValid(List<MultipartFile> value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            // If the list is null or empty, it's considered invalid
            return false;
        }

        for (MultipartFile file : value) {
            // Check if any file is null or empty
            if (file == null || file.isEmpty()) {
                return false;
            }

            // Check if the content type of each file is an image
            try {
                if (!isValidImageContentType(file.getInputStream(), file.getContentType())) {
                    return false;
                }
            } catch (IOException e) {
                // Handle IO exception (e.g., file reading error)
                e.printStackTrace();
                return false;
            }
        }

        // All files are valid images
        return true;
    }

    private boolean isValidImageContentType(InputStream inputStream, String contentType) {
        return contentType != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(contentType);
    }

}
