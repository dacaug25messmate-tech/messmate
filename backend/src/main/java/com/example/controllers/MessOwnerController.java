package com.example.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.SubscriptionCustomer;
import com.example.services.SubscriptionService; 

@RestController
@RequestMapping("/mess-owner")
@CrossOrigin(origins = "http://localhost:3000")
public class MessOwnerController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping("/subscriptions/{messId}")
    public ResponseEntity<List<SubscriptionCustomer>> getAllSubscriptions(
            @PathVariable Long messId) {

        return ResponseEntity.ok(
            subscriptionService.getAllSubscribedCustomers(messId)
        );
    }

}
