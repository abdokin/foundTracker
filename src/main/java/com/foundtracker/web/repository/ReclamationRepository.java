package com.foundtracker.web.repository;

import com.foundtracker.web.enums.ReclamationStatus;
import com.foundtracker.web.model.Reclamation;
import com.foundtracker.web.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    Page<Reclamation> findAllByUser(User user, Pageable pageable);
    Optional<Reclamation> findByUserAndId(User user, Long id);
    Optional<Reclamation> findByUserAndCode(User user, String code);
    Optional<Reclamation> findByCode(String code);
    @Query("select count(e) from Reclamation e where e.status = ?1")
    long countByStatus(ReclamationStatus status);

}
