package com.foundtracker.web.service;


import com.foundtracker.web.dto.CreateItemDto;
import com.foundtracker.web.dto.EditItemDto;
import com.foundtracker.web.dto.ItemDto;
import com.foundtracker.web.enums.ItemStatus;
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

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private  final ImageService imageService;
    private final UserService userService;

    public ItemDto save(CreateItemDto input) throws IOException,IllegalStateException {
        Item item = CreateItemDto.mapToDto(input);
        item.setStatus(ItemStatus.FOUND);
        item.setUser(userService.getCurrentUser());
        itemRepository.save(item);
        List<Image> images = imageService.storeImages(input.getImages(),item);
        item.setImages(images);
        return ItemDto.mapToDto(item);
    }
    public Page<ItemDto> findAll(Pageable pageable) {
        Page<Item> items = itemRepository.findAll(pageable);
        return items.<ItemDto>map(ItemDto::mapToDto);
    }
    public ItemDto findById(Long id) {
        Item item = itemRepository.findById(id).orElse(null);
        assert item != null;
        return ItemDto.mapToDto(item);
    }
    public void delete(Long id) {
        itemRepository.deleteById(id);
    }
    public ItemDto edit(Long id, EditItemDto input) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
        item.setName(input.getName());
        item.setDescription(input.getDescription());
        return ItemDto.mapToDto(itemRepository.save(item));
    }
}
