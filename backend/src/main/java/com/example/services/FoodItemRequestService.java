package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.FoodItemRequestDTO;
import com.example.entities.FoodItem;
import com.example.entities.FoodItemRequest;
import com.example.entities.SubCategory;
import com.example.entities.User;
import com.example.repository.FoodItemRepository;
import com.example.repository.FoodItemRequestRepository;
import com.example.repository.SubCategoryRepository;
import com.example.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FoodItemRequestService {

    @Autowired
    private FoodItemRequestRepository requestRepo;

    @Autowired
    private FoodItemRepository foodItemRepo;

    @Autowired
    private SubCategoryRepository subCategoryRepo;

    @Autowired
    private UserRepository userRepo;

    // ---------------------------
    // Create Food Item Request (Mess Owner)
    // ---------------------------
    public FoodItemRequest createRequest(FoodItemRequestDTO dto, Integer userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubCategory subCategory = subCategoryRepo.findById(dto.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));

        FoodItemRequest request = new FoodItemRequest();
        request.setItemName(dto.getFoodName());
        request.setDescription(dto.getDescription());
        request.setStatus("PENDING");
        request.setUserId(user);
        request.setSubCategory(subCategory);

        return requestRepo.save(request);
    }

    // ---------------------------
    // View Pending Requests (Admin)
    // ---------------------------
    public List<FoodItemRequest> getPendingRequests() {
        return requestRepo.findByStatus("PENDING");
    }

    // ---------------------------
    // Approve Request (Admin)
    // ---------------------------
    public void approveRequest(Integer requestId) {

        FoodItemRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        FoodItem foodItem = new FoodItem();
        foodItem.setFoodName(request.getItemName());
        foodItem.setDescription(request.getDescription());
        foodItem.setSubCategory(request.getSubCategory());

        foodItemRepo.save(foodItem);

        request.setStatus("APPROVED");
        requestRepo.save(request);
    }

    // ---------------------------
    // Reject Request (Admin)
    // ---------------------------
    public void rejectRequest(Integer requestId) {

        FoodItemRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("REJECTED");
        requestRepo.save(request);
    }
}
