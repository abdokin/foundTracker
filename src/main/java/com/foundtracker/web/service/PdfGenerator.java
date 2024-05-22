package com.foundtracker.web.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.foundtracker.web.dto.ReclamationDto;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;

@Service
public class PdfGenerator {

    public byte[] generatePDF(ReclamationDto reclamation) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(outputStream);
                PdfDocument pdfDocument = new PdfDocument(writer);
                Document document = new Document(pdfDocument)) {
            addTitleText(document, "Reclamation Details");
            addReclamationDetails(document, reclamation);
            document.add(new Paragraph("\n")); // Add some space between reclamations
        }
        return outputStream.toByteArray();
    }
    
    private void addReclamationDetails(Document document, ReclamationDto reclamation) {
        Table table = new Table(2);
        table.addCell(createHeaderCell("Reclamation Number"));
        table.addCell(createValueCell(reclamation.getCode()));
        table.addCell(createHeaderCell("Sujet"));
        table.addCell(createValueCell(reclamation.getSujet()));
        table.addCell(createHeaderCell("Description"));
        table.addCell(createValueCell(reclamation.getDescription()));
        table.addCell(createHeaderCell("Item Name"));
        table.addCell(createValueCell(reclamation.getItem().getName()));
        table.addCell(createHeaderCell("Item Description"));
        table.addCell(createValueCell(reclamation.getItem().getDescription()));
        table.addCell(createHeaderCell("Owner Fist Name"));
        table.addCell(createValueCell(reclamation.getUser().getFirstname()));
        table.addCell(createHeaderCell("Owner Last Name"));
        table.addCell(createValueCell(reclamation.getUser().getLastname()));
        table.addCell(createHeaderCell("Owner Email"));
        table.addCell(createValueCell(reclamation.getUser().getEmail()));

        document.add(table);
    }

    private void addTitleText(Document document, String titleText) {
        Paragraph paragraph = new Paragraph(titleText).setBold().setFontSize(20).setMarginTop(20);
        paragraph.setTextAlignment(TextAlignment.CENTER);
        document.add(paragraph);
    }

    private Cell createHeaderCell(String header) {
        Cell cell = new Cell();
        cell.add(new Paragraph(header).setBold());
        // cell.setBackgroundColor(new Color());
        cell.setPadding(5);
        return cell;
    }

    private Cell createValueCell(String value) {
        Cell cell = new Cell();
        cell.add(new Paragraph(value));
        cell.setPadding(5);
        return cell;
    }
}
