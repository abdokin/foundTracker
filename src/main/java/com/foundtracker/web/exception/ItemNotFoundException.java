package com.foundtracker.web.exception;

public class ItemNotFoundException extends RuntimeException {

    private final Long itemId;

    public ItemNotFoundException( long itemId) {
        super("Item  with ID '" + itemId + "' not found");

        this.itemId = itemId;
    }



    public Long getItemId() {
        return itemId;
    }
}
