package com.foundtracker.web.enums;

import lombok.Getter;

@Getter
public enum ItemStatus {
    FOUND("FOUND"),
    CLAIMED("CLAIMED");

    private final String status;

    ItemStatus(String status) {
        this.status = status;
    }

}
