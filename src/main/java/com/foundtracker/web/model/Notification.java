package com.foundtracker.web.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue
    private int id;
    @Column(nullable = false,length = 300) // MAX len
    private String message;
    private LocalDateTime receivedAt;

    @ManyToOne
    @JoinColumn(name = "reclamation_id")
    private Reclamation reclamation;


    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    public User user;

}
