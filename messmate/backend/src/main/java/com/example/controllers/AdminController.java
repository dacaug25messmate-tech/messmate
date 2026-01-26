package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.User;
import com.example.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get pending registration requests
    //GET    http://localhost:2025/api/admin/pendingusers
    @GetMapping("/pendingusers")    
    public List<User> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    // Approve user
  //PUT    http://localhost:2025/api/admin/approve/5
    @PutMapping("/approve/{id}")         
    public User approveUser(@PathVariable int id) {
        return adminService.approveUser(id);
    }

    // Reject user
  //PUT    http://localhost:2025/api/admin/reject/5
    @PutMapping("/reject/{id}")
    public User rejectUser(@PathVariable int id) {
        return adminService.rejectUser(id);
    }
    
 // View all users
  //GET   http://localhost:2025/api/admin/viewusers
    @GetMapping("/viewusers")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
}
