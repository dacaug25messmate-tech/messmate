package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entities.FoodItem;
import com.example.entities.FoodItemRequest;
import com.example.repository.FoodItemRepository;
import com.example.repository.FoodItemRequestRepository;

@Service
public class FoodItemRequestService {

    @Autowired
    private FoodItemRequestRepository requestRepo;

    @Autowired
    private FoodItemRepository foodItemRepo;

    public List<FoodItemRequest> getPendingRequests() {
        return requestRepo.findByStatus("PENDING");
    }

    @Transactional
    public FoodItemRequest approveRequest(int requestId) {

        FoodItemRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        boolean exists = foodItemRepo.existsByFoodNameAndSubCategory(
                req.getItemName(),
                req.getSubCategory()
        );

        if (exists) {
            throw new RuntimeException(
                "Food item already exists in this sub-category"
            );
        }

        FoodItem foodItem = new FoodItem();
        foodItem.setFoodName(req.getItemName());
        foodItem.setDescription(req.getDescription());
        foodItem.setSubCategory(req.getSubCategory());

        foodItemRepo.save(foodItem);

        req.setStatus("APPROVED");
        return requestRepo.save(req);
    }

    @Transactional
    public FoodItemRequest saveRequest(FoodItemRequest request) {
        request.setStatus("PENDING");
        return requestRepo.save(request);
    }

    @Transactional
    public FoodItemRequest rejectRequest(int requestId) {

        FoodItemRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("REJECTED");
        return requestRepo.save(req);
    }
}
