package com.foundtracker.web.controller;

import com.foundtracker.web.dto.CreateReclamationDto;
import com.foundtracker.web.dto.ReclamationDto;
import com.foundtracker.web.service.PdfGenerator;
import com.foundtracker.web.service.ReclamationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reclamations")
@RequiredArgsConstructor
@Tag(name = "Reclamations Management")
public class ReclamationController {
    private final ReclamationService reclamationService;
    private final PdfGenerator pdfGenerator;

    @GetMapping
    public ResponseEntity<Page<ReclamationDto>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReclamationDto> reclamations = reclamationService.findAll(PageRequest.of(page, size));

        return ResponseEntity.ok(reclamations);
    }

    @GetMapping("/export/{reclamationCode}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable String reclamationCode) throws IOException {
        ReclamationDto reclamation = reclamationService.findByCode(reclamationCode);
        byte[] content = pdfGenerator.generatePDF(reclamation);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)

                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(content);

    }

    @GetMapping("/track/{reclamationCode}")
    public ResponseEntity<ReclamationDto> getReclamation(@PathVariable String reclamationCode) {
        ReclamationDto reclamation = reclamationService.findByCode(reclamationCode);
        return ResponseEntity.ok(reclamation);
    }

    @GetMapping("/{reclamationId}")
    public ResponseEntity<ReclamationDto> getReclamation(@PathVariable Long reclamationId) {
        ReclamationDto reclamation = reclamationService.findById(reclamationId);
        return ResponseEntity.ok(reclamation);
    }

    @PostMapping("/{reclamationId}/reject")
    public ResponseEntity<ReclamationDto> rejectReclamation(@PathVariable Long reclamationId) {
        ReclamationDto reclamation = reclamationService.reject(reclamationId);
        return ResponseEntity.ok(reclamation);
    }

    @PostMapping("/{reclamationId}/accept")
    public ResponseEntity<ReclamationDto> acceptReclamation(@PathVariable Long reclamationId) {
        ReclamationDto reclamation = reclamationService.accept(reclamationId);
        return ResponseEntity.ok(reclamation);
    }

    @PostMapping(value = "/create", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE
    })
    public ResponseEntity<String> createReclamation(@ModelAttribute @Valid CreateReclamationDto reclamation)
            throws IOException {
        reclamationService.save(reclamation);
        return ResponseEntity.ok("Reclamtion Created");
    }

}
