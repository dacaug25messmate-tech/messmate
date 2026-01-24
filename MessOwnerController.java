package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.services.MessOwnerService;

@RestController
@RequestMapping("/api/messowner")
@CrossOrigin(origins = "http://localhost:3000")
public class MessOwnerController {

    @Autowired
    private MessOwnerService messOwnerService;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable int userId) {
        return ResponseEntity.ok(
            messOwnerService.getMessOwnerProfile(userId)
        );
    }
}
