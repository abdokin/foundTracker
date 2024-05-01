package com.foundtracker.web.model;


import jakarta.persistence.*;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Image {
    @Id
    @GeneratedValue
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
}
