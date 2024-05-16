package com.foundtracker.web.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.foundtracker.web.enums.ReclamationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reclamation {
    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false, unique = true)
    String code;
    String sujet;
    @Column(nullable = false, length = 300)
    String description;

    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ReclamationStatus status = ReclamationStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "item_id", nullable = false)
    @JsonManagedReference
    private Item item;

    @OneToMany(mappedBy = "reclamation", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Notification> notifications;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonBackReference
    @JoinColumn(name = "user_id")
    public User user;


    @OneToMany(mappedBy = "reclamation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Document> docs;


}
