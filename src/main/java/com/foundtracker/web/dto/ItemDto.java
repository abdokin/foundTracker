package com.foundtracker.web.dto;

import com.foundtracker.web.enums.ItemStatus;
import com.foundtracker.web.model.Image;
import com.foundtracker.web.model.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Schema(name = "Item")
public class ItemDto {
    private Integer id;
    String name;
    String description;
    private LocalDateTime foundDateTime;
    private ItemStatus status = ItemStatus.FOUND;
    private List<ImageDto> images;

    public  static ItemDto mapToDto(Item item) {
        return ItemDto.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .foundDateTime(item.getFoundDateTime())
                .status(item.getStatus())
                .images(item.getImages().stream().map(ImageDto::mapToDto).toList())
                .build();
    }
}
