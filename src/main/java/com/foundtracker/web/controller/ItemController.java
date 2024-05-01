package com.foundtracker.web.controller;


import com.foundtracker.web.dto.CreateItemDto;
import com.foundtracker.web.dto.EditItemDto;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.responses.ApiResponse;
import com.foundtracker.web.service.ItemService;
import com.foundtracker.web.validator.ImageFiles;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/management/items")
@RequiredArgsConstructor
@Tag(name = "Management")
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public ApiResponse<Page<Item>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findAll(PageRequest.of(page, size));

        return ApiResponse.success(items,"items loaded successfully");
    }

    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ApiResponse<Item> addItem(@ModelAttribute @Valid CreateItemDto item) throws IOException {
        return ApiResponse.success(itemService.save(item),"item added successfully");
    }
        @PatchMapping("/{id}/edit")
    public ApiResponse<Item> editItem(@PathVariable Long id, @RequestBody EditItemDto itemDto) {
        return ApiResponse.success(itemService.edit(id, itemDto), "Item edited successfully");
    }
}