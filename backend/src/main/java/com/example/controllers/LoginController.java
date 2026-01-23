package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.LoginRequest;
import com.example.dto.LoginResponse;
import com.example.services.LoginService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000") 
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);

        switch (response.getStatus()) {
            case "SUCCESS":
                return ResponseEntity.ok(response);
            case "USER_NOT_FOUND":
            case "INVALID_PASSWORD":
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown error");
        }
    }
}
