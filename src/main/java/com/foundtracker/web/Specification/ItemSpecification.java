package com.foundtracker.web.Specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.foundtracker.web.enums.ItemStatus;
import com.foundtracker.web.model.Item;

import jakarta.persistence.criteria.Predicate;

public class ItemSpecification {
    public static Specification<Item> nameLike(String nameLike) {
        return (root, query, builder) -> builder.like(root.get("name"), "%" + nameLike + "%");
    }

    public static Specification<Item> status(ItemStatus[] itemStatus) {
        return (root, query, builder) -> {
            // Create a predicate to check if the status is in the provided array
            Predicate statusPredicate = root.get("status").in((Object[]) itemStatus);
            return statusPredicate;
        };
    }
    public static Specification<Item> foundDateTimeAt(LocalDateTime foundDateTimeAt) {
        return (root, query, builder) -> builder.greaterThan(root.get("foundDateTimeAt"), foundDateTimeAt);
    }

}
