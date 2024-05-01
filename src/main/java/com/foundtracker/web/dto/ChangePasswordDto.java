package com.foundtracker.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Schema(name = "ChangePasswordInput")
public class ChangePasswordDto {

    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}
