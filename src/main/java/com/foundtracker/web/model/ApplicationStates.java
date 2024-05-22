package com.foundtracker.web.model;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStates {
    long totalItems;
    long totalReclamations;
    long totalAcceptedReclamations;
    long totalRejectedReclamations;
    long totalUsers;
    List<Map<String, Object>> itemMonthlyCount;
    List<Map<String, Object>> reclamationonthlyCount;

}
