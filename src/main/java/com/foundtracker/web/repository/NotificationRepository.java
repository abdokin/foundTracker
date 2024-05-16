package com.foundtracker.web.repository;

import com.foundtracker.web.model.Notification;
import com.foundtracker.web.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    public Page<Notification> findAllByUserOrderByOpened(User user, Pageable pageable);

    public Page<Notification> findByUserAndReclamationId(User user, long reclamation_id, Pageable pageable);
}
