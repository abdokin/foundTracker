package com.foundtracker.web.service;


import com.foundtracker.web.dto.CreateItemDto;
import com.foundtracker.web.dto.EditItemDto;
import com.foundtracker.web.exception.ItemNotFoundException;
import com.foundtracker.web.model.Image;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private  final ImageService imageService;
    public Item save(CreateItemDto input) throws IOException {
        Item item = CreateItemDto.mapToItem(input);
        itemRepository.save(item);
        List<Image> images = imageService.storeImages(input.getImages(),item);
        item.setImages(images);
        return item;
    }
    public Page<Item> findAll(Pageable pageable) {
        Page<Item> items = itemRepository.findAll(pageable);
        items.map(item -> {
            item.setImages(item.getImages().stream().peek(image -> image.setItem(null)).collect(Collectors.toList()));
            return item;
        });
        return items;
    }
    public Item findById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }
    public void delete(Long id) {
        itemRepository.deleteById(id);
    }
    public Item edit(Long id, EditItemDto input) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        item.setName(input.getName());
        item.setDescription(input.getDescription());
        return itemRepository.save(item);
    }
}
