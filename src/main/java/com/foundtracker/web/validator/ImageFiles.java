package com.foundtracker.web.validator;

import com.foundtracker.web.validator.ImagesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import org.springframework.web.multipart.MultipartFile;

import java.lang.annotation.*;

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
