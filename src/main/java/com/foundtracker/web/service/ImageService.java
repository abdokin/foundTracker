package com.foundtracker.web.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.foundtracker.web.model.Image;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final StorageService storageService;

    public List<Image> storeImages(List<MultipartFile> files, Item item) throws java.io.IOException {
        List<String> urls = storageService.storeFiles(files);
        List<Image> images = urls.stream().map(it -> Image.builder().imageUrl(it).item(item).build()).toList();

        imageRepository.saveAll(images);
        return images.stream()
                .peek(it -> it.setItem(null))
                .toList();
    }
}
