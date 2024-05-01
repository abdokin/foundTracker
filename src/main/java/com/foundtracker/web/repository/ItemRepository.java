package com.foundtracker.web.repository;

import com.foundtracker.web.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
