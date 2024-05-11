package com.foundtracker.web.validator;

import java.lang.annotation.*;

import com.foundtracker.web.validator.impl.MultipleFileValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = MultipleFileValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidImageFiles {
    String message() default "Invalid file(s) uploaded. Only images with extensions jpg, jpeg, png, gif, or webp are allowed.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
