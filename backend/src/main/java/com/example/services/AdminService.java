package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.User;
import com.example.repository.UserRepository;

@Service
public class AdminService {

	 @Autowired
	    private UserRepository userRepository;

	    // Fetch users with PENDING status
	    public List<User> getPendingUsers() {
	        return userRepository.findByStatus("PENDING");
	    }

	    // Approve user
	    public User approveUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setStatus("APPROVED");
	        return userRepository.save(user);
	    }

	    // Reject user
	    public User rejectUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setStatus("REJECTED");
	        return userRepository.save(user);
	    }
	    
	    // View all users
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }
}

