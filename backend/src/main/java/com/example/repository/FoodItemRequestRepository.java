package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.FoodItemRequest;

public interface FoodItemRequestRepository extends JpaRepository<FoodItemRequest, Integer> {

	List<FoodItemRequest> findByStatus(String status);
}