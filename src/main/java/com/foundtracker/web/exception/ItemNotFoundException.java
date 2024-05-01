package com.foundtracker.web.exception;

import lombok.Getter;

@Getter
public class ItemNotFoundException extends RuntimeException {

    private final Long itemId;

    public ItemNotFoundException( long itemId) {
        super("Item  with ID '" + itemId + "' not found");

        this.itemId = itemId;
    }


}
