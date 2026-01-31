package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByUserName(String userName);
	
	boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
    
    List<User> findByStatus(String status);
    
    List<User> findByStatusAndRoleId_RoleNameIn(
            String status,
            List<String> roleNames
    );
}
