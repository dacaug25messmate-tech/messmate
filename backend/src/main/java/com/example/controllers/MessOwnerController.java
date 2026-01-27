//package com.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.dto.FoodItemRequestDTO;
//import com.example.entities.FoodItemRequest;
//import com.example.entities.Mess;
//import com.example.entities.SubCategory;
//import com.example.repository.MessRepository;
//import com.example.repository.SubCategoryRepository;
//import com.example.services.FoodItemRequestService;
//
//@RestController
//@RequestMapping("/api/messowner")
//@CrossOrigin(origins = "http://localhost:3000")
//public class MessOwnerController {
//
//    @Autowired
//    private FoodItemRequestService service;
//
//    @Autowired
//    private SubCategoryRepository subCategoryRepository;
//
//    @Autowired
//    private MessRepository messRepository;
//
//    @PostMapping("/food-requests")
//    public ResponseEntity<?> createRequest(@RequestBody FoodItemRequestDTO dto) {
//
//        //  Validate DTO
//        if (dto.getMessId() == null) return ResponseEntity.badRequest().body("Mess ID is required");
//        if (dto.getSubCategoryId() == null) return ResponseEntity.badRequest().body("SubCategory ID is required");
//
//        //  Fetch related entities
//        SubCategory subCategory = subCategoryRepository
//                .findById(dto.getSubCategoryId())
//                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
//
//        Mess mess = messRepository
//                .findById(dto.getMessId())
//                .orElseThrow(() -> new RuntimeException("Mess not found"));
//
//        //  Create FoodItemRequest
//        FoodItemRequest req = new FoodItemRequest();
//        req.setItemName(dto.getFoodName());
//        req.setDescription(dto.getDescription());
//        req.setSubCategory(subCategory);
//        req.setMessId(mess);
//        req.setStatus("PENDING");
//
//        FoodItemRequest saved = service.saveRequest(req);
//        return ResponseEntity.ok(saved);
//    }
//}
package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.FoodItemRequestDTO;
import com.example.dto.MessRequestDTO;
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

    // 🔹 SERVICES
    @Autowired
    private MessOwnerService messOwnerService;

    @Autowired
    private FoodItemRequestService foodItemRequestService;

    // 🔹 REPOSITORIES
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private MessRepository messRepository;

    // =========================
    // 1️⃣ GET MESS OWNER PROFILE
    // =========================
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable int userId) {
        return ResponseEntity.ok(
                messOwnerService.getMessOwnerProfile(userId)
        );
    }
    
    @PostMapping("/mess")
    public ResponseEntity<?> addMess(@RequestBody MessRequestDTO dto) {
        try {
            Mess savedMess = messOwnerService.addMess(dto);
            return ResponseEntity.ok(savedMess);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // ---------------------------
    // Update Mess by messId
    // ---------------------------
    @PutMapping("/mess")
    public ResponseEntity<?> updateMess(@RequestBody MessRequestDTO dto) {
        try {
            Mess updatedMess = messOwnerService.updateMess(dto);
            return ResponseEntity.ok(updatedMess);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/messes/{userId}")
    public ResponseEntity<List<Mess>> getAllMesses(@PathVariable Integer userId) {
        return ResponseEntity.ok(
                messOwnerService.getAllMessesByUser(userId)
        );
    }

    // ==========================
    // 2️⃣ GET SINGLE MESS DETAILS
    // ==========================
    @GetMapping("/mess/details/{messId}")
    public ResponseEntity<Mess> getMessDetails(@PathVariable Integer messId) {
        return ResponseEntity.ok(
                messOwnerService.getMessById(messId)
        );
    }

    // ---------------------------
    // Get all messes of a user
    // ---------------------------
    @GetMapping("/mess/{userId}")
    public ResponseEntity<?> getMessesByUser(@PathVariable Integer userId) {
        List<Mess> messList = messOwnerService.getMessByUser(userId);
        return ResponseEntity.ok(messList); // returns empty list if none
    }
    @DeleteMapping("/mess/{messId}")
    public ResponseEntity<?> deleteMess(@PathVariable Integer messId) {
        try {
            messOwnerService.deleteMess(messId);
            return ResponseEntity.ok("Mess deleted successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // =========================
    // 2️⃣ CREATE FOOD ITEM REQUEST
    // =========================
    @PostMapping("/food-requests")
    public ResponseEntity<?> createRequest(@RequestBody FoodItemRequestDTO dto) {

        // ✅ Validate DTO
        if (dto.getMessId() == null)
            return ResponseEntity.badRequest().body("Mess ID is required");

        if (dto.getSubCategoryId() == null)
            return ResponseEntity.badRequest().body("SubCategory ID is required");

        // ✅ Fetch related entities
        SubCategory subCategory = subCategoryRepository
                .findById(dto.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));

        Mess mess = messRepository
                .findById(dto.getMessId())
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        // ✅ Create FoodItemRequest
        FoodItemRequest req = new FoodItemRequest();
        req.setItemName(dto.getFoodName());
        req.setDescription(dto.getDescription());
        req.setSubCategory(subCategory);
        req.setMessId(mess);
        req.setStatus("PENDING");

        FoodItemRequest saved = foodItemRequestService.saveRequest(req);
        return ResponseEntity.ok(saved);
    }
}
