package com.foundtracker.web.repository;

import com.foundtracker.web.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
