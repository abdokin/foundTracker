package com.foundtracker.web.validator;

import java.lang.annotation.*;

import com.foundtracker.web.validator.impl.MultipleDocumentValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = MultipleDocumentValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidDocuments {
    String message() default "Invalid file(s) uploaded. Only files with extensions pdf jpg, jpeg, png, gif, or webp are allowed.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
