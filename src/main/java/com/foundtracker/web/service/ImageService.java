package com.foundtracker.web.service;

import com.foundtracker.web.model.Image;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private  final ImageRepository imageRepository;
    private final Path storageLocation = Paths.get("uploads");

    public List<Image> storeImages(List<MultipartFile> files, Item item) throws IOException {
        List<Image> images = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty: " + file.getOriginalFilename());
            }
            String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String extension = getFileExtension(originalFilename);
            if (!isValidImageExtension(extension)) {
                throw new IllegalArgumentException("Invalid file extension: " + originalFilename);
            }
            String destinationFileName = generateUniqueFilename(extension);
            Path destinationFilePath = this.storageLocation.resolve(destinationFileName).normalize().toAbsolutePath();
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            images.add(Image.builder().imageUrl(destinationFileName).item(item).build());
        }
        imageRepository.saveAll(images);
        return images.stream()
                .peek(it -> it.setItem(null))
                .toList();
    }

    private String generateUniqueFilename(String extension) {
        return UUID.randomUUID() + "." + extension;
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1 || lastDotIndex == filename.length() - 1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1);
    }

    private boolean isValidImageExtension(String extension) {
        List<String> validExtensions = List.of("jpg", "jpeg", "png", "gif","webp");
        return validExtensions.contains(extension.toLowerCase());
    }

    public Resource loadImage(String filename) throws MalformedURLException {
        Path file = storageLocation.resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Failed to load image: " + filename);
        }
    }
}
