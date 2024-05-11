package com.foundtracker.web.validator.impl;

import org.springframework.web.multipart.MultipartFile;

import com.foundtracker.web.validator.ValidImageFiles;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class MultipleFileValidator implements ConstraintValidator<ValidImageFiles, List<MultipartFile>> {

    private static final int MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    private static final int MAX_NUMBER_OF_FILES = 5;

    @Override
    public void initialize(ValidImageFiles constraintAnnotation) {
    }

    @Override
    public boolean isValid(List<MultipartFile> files, ConstraintValidatorContext context) {
        if (files == null || files.isEmpty()) {
            return true; // No files uploaded, validation passes
        }

        if (files.size() > MAX_NUMBER_OF_FILES) {
            return false; // Number of files exceeds the limit
        }

        for (MultipartFile file : files) {
            if (file.isEmpty() || !isValidImageExtension(file.getOriginalFilename())) {
                return false; // Invalid file uploaded
            }

            if (file.getSize() > MAX_FILE_SIZE_BYTES) {
                return false; // File size exceeds
            }
        }

        return true; // All files are valid images
    }

    private boolean isValidImageExtension(String filename) {
        if (filename == null) {
            return false;
        }

        String extension = getFileExtension(filename);
        List<String> validExtensions = List.of("jpg", "jpeg", "png", "gif", "webp");
        return validExtensions.contains(extension.toLowerCase());
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1 || lastDotIndex == filename.length() - 1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1);
    }
}
