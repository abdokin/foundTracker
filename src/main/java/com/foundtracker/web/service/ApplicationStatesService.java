package com.foundtracker.web.service;

import org.springframework.stereotype.Service;

import com.foundtracker.web.enums.ReclamationStatus;
import com.foundtracker.web.model.ApplicationStates;
import com.foundtracker.web.model.Item;
import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.repository.ItemRepository;
import com.foundtracker.web.repository.ReclamationRepository;

import lombok.RequiredArgsConstructor;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationStatesService {

        final ItemRepository itemRepository;
        final ReclamationRepository reclamationRepository;

        public ApplicationStates getMonthly() {
                return ApplicationStates.builder()
                                .totalReclamations(reclamationRepository.count())
                                .totalItems(itemRepository.count())
                                .totalAcceptedReclamations(
                                                reclamationRepository.countByStatus(ReclamationStatus.APPROVED))
                                .totalRejectedReclamations(
                                                reclamationRepository.countByStatus(ReclamationStatus.REJECTED))
                                .itemMonthlyCount(getItemCountByMonth())
                                .reclamationonthlyCount(getReclamationCountByMonth())
                                .build();
        }

        private List<Map<String, Object>> getItemCountByMonth() {
                List<Item> items = itemRepository.findAll();

                // Initialize a map with all 12 months and zero counts
                Map<Month, Long> monthCounts = Arrays.stream(Month.values())
                                .collect(Collectors.toMap(month -> month, month -> 0L));

                // Count items per month and update the initialized map
                items.stream()
                                .collect(Collectors.groupingBy(item -> item.getFoundDateTime().getMonth(),
                                                Collectors.counting()))
                                .forEach(monthCounts::put);

                // Convert the map to a list of State objects with the required format and sort
                // by month ordinal
                return monthCounts.entrySet().stream()
                                .sorted(Map.Entry.comparingByKey()) // Sort by month
                                .map(entry -> {
                                        Map<String, Object> map = new HashMap<>();
                                        map.put("name", entry.getKey().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
                                        map.put("count", entry.getValue());
                                        return map;
                                })
                                .collect(Collectors.toList());
        }

        private List<Map<String, Object>> getReclamationCountByMonth() {
                List<Reclamation> reclamations = reclamationRepository.findAll();

                // Initialize a map with all 12 months and zero counts
                Map<Month, Long> monthCounts = Arrays.stream(Month.values())
                                .collect(Collectors.toMap(month -> month, month -> 0L));

                // Count reclamations per month and update the initialized map
                reclamations.stream()
                                .collect(Collectors.groupingBy(reclamation -> reclamation.getCreatedAt().getMonth(),
                                                Collectors.counting()))
                                .forEach(monthCounts::put);

                // Convert the map to a list of State objects with the required format and sort
                // by month ordinal
                return monthCounts.entrySet().stream()
                                .sorted(Map.Entry.comparingByKey()) // Sort by month
                                .map(entry -> {
                                        Map<String, Object> map = new HashMap<>();
                                        map.put("name", entry.getKey().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
                                        map.put("count", entry.getValue());
                                        return map;
                                })
                                .collect(Collectors.toList());
        }
}
