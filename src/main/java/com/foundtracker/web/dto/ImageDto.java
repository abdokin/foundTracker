package com.foundtracker.web.dto;

import com.foundtracker.web.model.Image;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
@Schema(name = "Image")
public class ImageDto {
    private Long id;
    private String imageUrl;
    public static ImageDto mapToDto(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .build();
    }
}
