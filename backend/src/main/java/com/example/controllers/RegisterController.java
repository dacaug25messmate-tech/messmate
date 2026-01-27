package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.RegisterRequest;
import com.example.dto.RegisterResponse;
import com.example.services.RegisterService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {

	@Autowired
	RegisterService rservice;
	
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        try {
            RegisterResponse response = rservice.register(request);

            //  Validation failure (username/email exists)
            if ("FAILURE".equals(response.getStatus())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT) 
                        .body(response.getMessage());
            }

            //  Success
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error");
        }
    }
}