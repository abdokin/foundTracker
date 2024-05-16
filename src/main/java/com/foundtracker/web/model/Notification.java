package com.foundtracker.web.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue
    private int id;
    private String sujet;
    @Column(nullable = false, length = 300)
    private String message;

    @Builder.Default
    private Boolean opened = false;
    @Builder.Default
    private LocalDateTime receivedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "reclamation_id")
    @JsonBackReference
    private Reclamation reclamation;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    public User user;

}
