package com.foundtracker.web.repository;

import java.util.Optional;

import com.foundtracker.web.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}
