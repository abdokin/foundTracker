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
import java.util.List;

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

    public void save(CreateReclamationDto input) throws IOException {
        Item item = itemRepository.findById(input.getItemId()).orElseThrow();
        Reclamation reclamation = reclamationRepository.save(Reclamation.builder()
                .item(item)
                .user(userService.getCurrentUser())
                .sujet(input.getSujet())
                .description(input.getDescription())
                .build());
        List<Document> documents = documentRepository.saveAll(
                storageService.storeFiles(input.getDocs()).stream()
                        .map(it -> Document.builder().reclamation(reclamation).documentUrl(it).build()).toList());
        reclamation.setDocs(documents);
        notificationService.send("Reclamation Created", reclamation);
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
        reclamationRepository.save(reclamation);
        return ReclamationDto.mapToDto(reclamation);
    }

    public ReclamationDto accept(Long reclamationId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElseThrow();
        reclamation.setStatus(ReclamationStatus.APPROVED);
        reclamationRepository.save(reclamation);
        return ReclamationDto.mapToDto(reclamation);
    }

}
