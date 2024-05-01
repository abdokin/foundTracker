package com.foundtracker.web.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Item {
    @Id
    @GeneratedValue
    private Integer id;
    String name;
    String description;

    private LocalDateTime foundDateTime;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;
}
