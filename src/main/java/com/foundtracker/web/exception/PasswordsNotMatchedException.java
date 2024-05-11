package com.foundtracker.web.exception;

public class PasswordsNotMatchedException extends Exception {
    public PasswordsNotMatchedException() {
    super("Passwords not matched");
    }
}
