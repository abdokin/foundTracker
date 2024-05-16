package com.foundtracker.web.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Document {
    @Id
    @GeneratedValue
    private Long id;
    private String documentName;
    @Column(nullable = false)
    private String documentUrl;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "reclamation_id", nullable = false)
    @JsonBackReference
    private Reclamation reclamation;

}
