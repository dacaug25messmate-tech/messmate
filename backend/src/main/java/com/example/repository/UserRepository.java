package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByUserName(String userName);
	
	boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
}
