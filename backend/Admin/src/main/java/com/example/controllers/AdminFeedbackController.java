//package com.example.controllers;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.dto.AdminFeedback;
//import com.example.services.AdminFeedbackService;
//
//
//@RestController
//@RequestMapping("/admin")
//public class AdminFeedbackController {
//
//    @Autowired
//    private AdminFeedbackService adminFeedbackService;
//
//    @GetMapping("/feedback")
//    public ResponseEntity<List<AdminFeedback>> viewAllFeedback() {
//        return ResponseEntity.ok(adminFeedbackService.getAllFeedback());
//    }
//}
