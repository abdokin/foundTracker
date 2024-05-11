package com.foundtracker.web.service;

import com.foundtracker.web.dto.ReclamationDto;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.repository.ItemRepository;
import com.foundtracker.web.repository.ReclamationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReclamationService {
    private final ReclamationRepository reclamationRepository;
    private final ItemRepository itemRepository;
    private final NotificationService notificationService;
    private final UserService userService;

    public ReclamationDto save(long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow();
        Reclamation reclamation = reclamationRepository.save(Reclamation.builder()
                .item(item)
                .user(userService.getCurrentUser())
                .build());
        notificationService.send("Reclamation Created",reclamation);
        return ReclamationDto.mapToDto(reclamation);
    }
    public ReclamationDto findById(long reclamationId) {
        return ReclamationDto.mapToDto(reclamationRepository.findByUserAndId(userService.getCurrentUser(),reclamationId).orElseThrow());
    }

    public Page<ReclamationDto> findAll(Pageable pageable) {
        return reclamationRepository.findAllByUser(userService.getCurrentUser(),pageable).map(ReclamationDto::mapToDto);
    }

}
