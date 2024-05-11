package com.foundtracker.web.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;

import java.lang.annotation.*;

import com.foundtracker.web.validator.impl.ImagesValidator;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ImagesValidator.class)
@ReportAsSingleViolation
public @interface ImageFiles {
    String message() default "Invalid image files";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
