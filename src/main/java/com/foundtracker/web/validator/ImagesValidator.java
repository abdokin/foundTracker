package com.foundtracker.web.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import org.apache.commons.io.IOUtils;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
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
//                e.printStackTrace();
                return false;
            }
        }

        return true;
    }

    private boolean isValidImageContentType(InputStream inputStream, String contentType) {
        try {
            // Read the first few bytes to determine the content type
            byte[] bytes = IOUtils.toByteArray(inputStream);
            MimeType detectedType = MimeTypeUtils.parseMimeType(contentType);

            // Determine if the detected content type is in the list of allowed types
            if (ALLOWED_IMAGE_CONTENT_TYPES.contains(detectedType.toString())) {
                return true;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }

}
