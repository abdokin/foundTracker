package com.foundtracker.web.controller;


import com.foundtracker.web.dto.CreateItemDto;
import com.foundtracker.web.dto.EditItemDto;
import com.foundtracker.web.dto.ItemDto;
import com.foundtracker.web.service.ItemService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
@Tag(name = "Items")
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<Page<ItemDto>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ItemDto> items = itemService.findAll(PageRequest.of(page, size));

        return ResponseEntity.ok(items);
    }

    @PostMapping(value = "/create", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE
    })
    public ResponseEntity<ItemDto> addItem(@ModelAttribute @Valid CreateItemDto item) throws IOException {
        return ResponseEntity.ok(itemService.save(item));
    }

    @PatchMapping(value = "/{id}/edit", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE
    })
    public ResponseEntity<ItemDto> editItem(@PathVariable Long id,
                                   @ModelAttribute @Valid EditItemDto itemDto) {
        return ResponseEntity.ok(itemService.edit(id, itemDto));
    }
}
