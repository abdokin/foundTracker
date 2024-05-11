package com.foundtracker.web.exception;

public class IncorrectPasswordException extends RuntimeException {

    public IncorrectPasswordException() {
        super("Current password is incorrect.");
    }
}
