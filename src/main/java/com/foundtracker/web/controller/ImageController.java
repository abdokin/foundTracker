package com.foundtracker.web.controller;


import com.foundtracker.web.service.ImageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
@Tag(name = "Images")
public class ImageController {
    private final ImageService imageService;
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> viewImage(@PathVariable String filename) throws MalformedURLException {
        Resource resource = imageService.loadImage(filename);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(resource);
    }

}
