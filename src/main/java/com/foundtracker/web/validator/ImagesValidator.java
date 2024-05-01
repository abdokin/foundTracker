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
    public boolean isValid(List<MultipartFile> value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        for (MultipartFile file : value) {
            if (file == null || file.isEmpty()) {
                return false;
            }

            try {
                if (!isValidImageContentType(file.getInputStream(), file.getContentType())) {
                    return false;
                }
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }

        return true;
    }

    private boolean isValidImageContentType(InputStream inputStream, String contentType) {
        return contentType != null && ALLOWED_IMAGE_CONTENT_TYPES.contains(contentType);
    }

}
