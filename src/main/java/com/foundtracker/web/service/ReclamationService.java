package com.foundtracker.web.service;

import com.foundtracker.web.dto.CreateReclamationDto;
import com.foundtracker.web.dto.ReclamationDto;
import com.foundtracker.web.enums.ReclamationStatus;
import com.foundtracker.web.model.Document;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.repository.DocumentRepository;
import com.foundtracker.web.repository.ItemRepository;
import com.foundtracker.web.repository.ReclamationRepository;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReclamationService {
    private final ReclamationRepository reclamationRepository;
    private final ItemRepository itemRepository;
    private final NotificationService notificationService;
    private final StorageService storageService;
    private final UserService userService;
    private final DocumentRepository documentRepository;
    private Random random = new Random();

    public void save(CreateReclamationDto input) throws IOException {
        Item item = itemRepository.findById(input.getItemId()).orElseThrow();
        Reclamation reclamation = reclamationRepository.save(Reclamation.builder()
                .item(item)
                .code(generateUniqueCode())
                .user(userService.getCurrentUser())
                .sujet(input.getSujet())
                .description(input.getDescription())
                .build());

        List<Document> documents = input.getDocs().stream()
                .map(file -> {
                    try {
                        String documentUrl = storageService.storeFile(file);
                        String documentName = file.getOriginalFilename();
                        return Document.builder()
                                .reclamation(reclamation)
                                .documentUrl(documentUrl)
                                .documentName(documentName)
                                .build();
                    } catch (IOException e) {
                        throw new RuntimeException("Error storing file: " + e.getMessage());
                    }
                })
                .collect(Collectors.toList());
        documentRepository.saveAll(documents);
        reclamation.setDocs(documents);
        notificationService.send("you reclmation has been created ", "Reclamation Created", reclamation);
    }

    public ReclamationDto findById(long reclamationId) {
        return ReclamationDto.mapToDto(
                reclamationRepository.findByUserAndId(userService.getCurrentUser(), reclamationId).orElseThrow());
    }

    public Page<ReclamationDto> findAll(Pageable pageable) {
        return reclamationRepository.findAllByUser(userService.getCurrentUser(), pageable)
                .map(ReclamationDto::mapToDto);
    }

    public ReclamationDto reject(Long reclamationId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElseThrow();
        reclamation.setStatus(ReclamationStatus.REJECTED);
        notificationService.send("your reclamation has been rejected", "Reclamation Reject",
                reclamationRepository.save(reclamation));

        return ReclamationDto.mapToDto(reclamation);
    }

    public ReclamationDto accept(Long reclamationId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElseThrow();
        reclamation.setStatus(ReclamationStatus.APPROVED);
        reclamationRepository.save(reclamation);
        notificationService.send(
                "your reclamation has been accepted with key " + reclamation.getCode() + " to claim your objet",
                "Reclamation Accepted",
                reclamation);

        return ReclamationDto.mapToDto(reclamation);
    }

    public String generateUniqueCode() {
        LocalDateTime now = LocalDateTime.now();
        String datePart = now.toString().replace("-", "").replace(":", "").replace(".", "");
        String randomPart = String.format("%03d", random.nextInt(1000)); // Random 3-digit number
        return datePart + randomPart;
    }

}
