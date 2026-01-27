package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entities.FoodItemRequest;
import com.example.services.FoodItemRequestService;

@RestController
@RequestMapping("/api/admin/food-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodItemRequestController {

    @Autowired
    private FoodItemRequestService service;

    // GET pending food item requests
    // http://localhost:2025/api/admin/food-requests
    @GetMapping
    public List<FoodItemRequest> getPendingFoodRequests() {
        return service.getPendingRequests();
    }

    // APPROVE
    // PUT http://localhost:2025/api/admin/food-requests/approve/1
    @PutMapping("/approve/{id}")
    public FoodItemRequest approve(@PathVariable int id) {
        return service.approveRequest(id);
    }

    // REJECT
    // PUT http://localhost:2025/api/admin/food-requests/reject/1
    @PutMapping("/reject/{id}")
    public FoodItemRequest reject(@PathVariable int id) {
        return service.rejectRequest(id);
    }
}
