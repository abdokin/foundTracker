package com.foundtracker.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foundtracker.web.model.Document;

public interface DocumentRepository  extends JpaRepository<Document,Long>{
    
}
