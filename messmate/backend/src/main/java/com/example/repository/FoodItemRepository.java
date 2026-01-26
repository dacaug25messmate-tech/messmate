package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.FoodItem;
import com.example.entities.SubCategory;

public interface FoodItemRepository 
        extends JpaRepository<FoodItem, Integer> {
	 boolean existsByFoodNameAndSubCategory(
		        String foodName,
		        SubCategory subCategory
		    );
}
