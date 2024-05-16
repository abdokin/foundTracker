package com.foundtracker.web.service;

import com.foundtracker.web.Specification.ItemSpecification;
import com.foundtracker.web.dto.CreateItemDto;
import com.foundtracker.web.dto.EditItemDto;
import com.foundtracker.web.dto.ItemDto;
import com.foundtracker.web.enums.ItemStatus;
import com.foundtracker.web.exception.ItemNotFoundException;
import com.foundtracker.web.model.Image;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.repository.ItemRepository;

import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ImageService imageService;

    public ItemDto save(CreateItemDto input) throws IOException {
        Item item = CreateItemDto.mapToDto(input);
        itemRepository.save(item);
        List<Image> images = imageService.storeImages(input.getImages(), item);
        item.setImages(images);
        return ItemDto.mapToDto(item);
    }

    public Page<ItemDto> findAll(Pageable pageable, String name, ItemStatus[] status, LocalDateTime date) {
        Specification<Item> filters = Specification
                .where(StringUtils.isBlank(name) ? null : ItemSpecification.nameLike(name))
                .and(status == null ? null : ItemSpecification.status(status))
                .and(date == null ? null : ItemSpecification.foundDateTimeAt(date));
        Page<Item> items = itemRepository.findAll(filters, pageable);
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
