package com.foundtracker.web.enums;

import lombok.Getter;

@Getter
public enum ReclamationStatus {
    PENDING("PENDING"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED");


    private final String status;

     ReclamationStatus(String status) {
        this.status = status;
    }
}
