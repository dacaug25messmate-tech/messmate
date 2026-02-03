package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.ForgotPasswordRequest;
import com.example.dto.ForgotPasswordResponse;
import com.example.dto.LoginRequest;
import com.example.dto.LoginResponse;
import com.example.entities.User;
import com.example.repository.UserRepository;
import com.example.services.ForgotPasswordService;
import com.example.services.LoginService;

@RestController
@RequestMapping("/user")
public class LoginController {

    @Autowired
    private LoginService loginService;
    
    @Autowired
    private ForgotPasswordService forgotService;
    
    @Autowired
    private UserRepository userrepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        LoginResponse response = loginService.login(request);

        switch (response.getStatus()) {

            case "SUCCESS":
                return ResponseEntity.ok(response);

            case "USER_NOT_FOUND":
            case "INVALID_PASSWORD":
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

            case "ACCESS_DENIED":
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
                

            case "NOT_APPROVED":
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            case "ACCOUNT_INACTIVE":
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);

            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Unknown error");
        }
    }
    
 //  endpoint to get user by username
    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        User user = userrepo.findByUserName(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        // Return only minimal info for forgot password (id, question)
        return ResponseEntity.ok(new Object() {
            public Integer userId = user.getUserid();
            public Integer questionId = user.getQuestionId().getQuestionId();
            public String questionText = user.getQuestionId().getQuestionText();
        });
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {

        ForgotPasswordResponse response = forgotService.resetPassword(request);

        switch (response.getStatus()) {

            case "SUCCESS":
                // Password reset successful
                return ResponseEntity.ok(response);

            case "USER_NOT_FOUND":
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

            case "INVALID_QUESTION":
                // User selected wrong question
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

            case "INVALID_ANSWER":
                // Wrong answer, check if account locked
                if (response.getMessage().contains("Maximum attempts exceeded")) {
                    return ResponseEntity.status(HttpStatus.LOCKED).body(response);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
                
            case "ACCOUNT_INACTIVE":
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);


            case "ACCOUNT_LOCKED":
                return ResponseEntity.status(HttpStatus.LOCKED).body(response);

            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }
}
