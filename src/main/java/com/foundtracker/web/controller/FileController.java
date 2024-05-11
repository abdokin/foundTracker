package com.foundtracker.web.controller;

import com.foundtracker.web.service.StorageService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Tag(name = "Files")
public class FileController {
    private final StorageService storageService;

   
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> viewFile(@PathVariable String filename) throws MalformedURLException {
        Resource resource = storageService.loadFile(filename);
        
        // Determine the media type based on the file's extension
        MediaType mediaType = null;
        try {
            String contentType = Files.probeContentType(Path.of(resource.getFile().getAbsolutePath()));
            if (contentType != null) {
                mediaType = MediaType.parseMediaType(contentType);
            }
        } catch (IOException e) {
            // Handle the exception (e.g., log it)
        }

        if (mediaType == null) {
            // Default to application/octet-stream if mediaType cannot be determined
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(resource);
    }
}
