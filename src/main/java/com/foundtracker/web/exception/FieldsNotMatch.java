package com.foundtracker.web.exception;

import lombok.Getter;

@Getter
public class FieldsNotMatch extends Exception {
    String field1;
    String field2;

    public FieldsNotMatch(String f1, String f2) {
        super("" + f1 + " Doesnt match " + f2);
        field1 = f1;
        field2 = f2;
    }
}
