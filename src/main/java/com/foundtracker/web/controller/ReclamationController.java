package com.foundtracker.web.controller;

import com.foundtracker.web.dto.ReclamationDto;
import com.foundtracker.web.service.ReclamationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reclamations")
@RequiredArgsConstructor
@Tag(name = "Reclamations Management")
public class ReclamationController {
    private final ReclamationService reclamationService;

    @GetMapping
    public ResponseEntity<Page<ReclamationDto>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReclamationDto> reclamations = reclamationService.findAll(PageRequest.of(page, size));

        return ResponseEntity.ok(reclamations);
    }

    @GetMapping("/{reclamationId}")
    public ResponseEntity<ReclamationDto> getReclamation(@PathVariable Long reclamationId) {
        ReclamationDto reclamation = reclamationService.findById(reclamationId);
        return ResponseEntity.ok(reclamation);
    }

    @PostMapping("/{itemId}")
    private ResponseEntity<ReclamationDto> create(@PathVariable long itemId) {
        ReclamationDto reclamation = reclamationService.save(itemId);
        return ResponseEntity.ok(reclamation);
    }
}
