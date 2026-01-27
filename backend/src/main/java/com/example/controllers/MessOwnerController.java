package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.FoodItemRequestDTO;
import com.example.entities.FoodItemRequest;
import com.example.entities.Mess;
import com.example.entities.SubCategory;
import com.example.repository.MessRepository;
import com.example.repository.SubCategoryRepository;
import com.example.services.FoodItemRequestService;
import com.example.services.MessOwnerService;

@RestController
@RequestMapping("/api/messowner")
@CrossOrigin(origins = "http://localhost:3000")
public class MessOwnerController {

    @Autowired
    private FoodItemRequestService foodservice;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private MessRepository messRepository;

    @Autowired
    private MessOwnerService messService;
    
    
    @PostMapping("/food-requests")
    public ResponseEntity<?> createRequest(@RequestBody FoodItemRequestDTO dto) {

        //  Validate DTO
        if (dto.getMessId() == null) return ResponseEntity.badRequest().body("Mess ID is required");
        if (dto.getSubCategoryId() == null) return ResponseEntity.badRequest().body("SubCategory ID is required");

        //  Fetch related entities
        SubCategory subCategory = subCategoryRepository
                .findById(dto.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));

        Mess mess = messRepository
                .findById(dto.getMessId())
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        //  Create FoodItemRequest
        FoodItemRequest req = new FoodItemRequest();
        req.setItemName(dto.getFoodName());
        req.setDescription(dto.getDescription());
        req.setSubCategory(subCategory);
        req.setMessId(mess);
        req.setStatus("PENDING");

        FoodItemRequest saved = foodservice.saveRequest(req);
        return ResponseEntity.ok(saved);
    }
    
    
    //GET http://localhost:2025/api/messowner/customers/{messId}
    @GetMapping("/customers/{messId}")
    public ResponseEntity<?> getRegisteredCustomers(@PathVariable int messId) {
        return ResponseEntity.ok(messService.getRegisteredCustomers(messId));
    }

}
