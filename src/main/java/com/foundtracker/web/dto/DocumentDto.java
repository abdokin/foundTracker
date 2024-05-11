package com.foundtracker.web.dto;

import com.foundtracker.web.model.Document;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
@Schema(name = "Document")
public class DocumentDto {
    private Long id;
    private String documentUrl;

    public static DocumentDto mapToDto(Document document) {
        return DocumentDto.builder()
                .id(document.getId())
                .documentUrl(document.getDocumentUrl())
                .build();
    }
}
