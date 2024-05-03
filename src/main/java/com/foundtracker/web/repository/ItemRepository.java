package com.foundtracker.web.repository;

import com.foundtracker.web.model.Item;
import com.foundtracker.web.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByUser(User user, Pageable pageable);
    Optional<Item> findByUserAndId(User user, Integer id);
}
