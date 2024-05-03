package com.foundtracker.web.model;

import com.foundtracker.web.enums.ItemStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
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
    @Column(nullable = false)
    String name;
    @Column(nullable = false,length = 300) //MAX Len is 300
    String description;
    private LocalDateTime foundDateTime;

    @Enumerated(EnumType.STRING)
    private ItemStatus status = ItemStatus.FOUND;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    public User user;

}
