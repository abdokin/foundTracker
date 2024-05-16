package com.foundtracker.web.repository;

import com.foundtracker.web.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ItemRepository extends JpaRepository<Item, Long> ,JpaSpecificationExecutor<Item>{
}
