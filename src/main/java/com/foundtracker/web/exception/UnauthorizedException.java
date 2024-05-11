package com.foundtracker.web.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
    public UnauthorizedException() {
        super("Not Authorized For this action");
    }
}