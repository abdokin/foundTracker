package com.foundtracker.web.repository;

import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    Page<Reclamation> findAllByUser(User user, Pageable pageable);
    Optional<Reclamation> findByUserAndId(User user, Long id);
}
