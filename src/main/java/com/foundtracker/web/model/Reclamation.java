package com.foundtracker.web.model;

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
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ReclamationStatus status = ReclamationStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @OneToMany(mappedBy = "reclamation",fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Notification> notifications;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    public User user;

}
