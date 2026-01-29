package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.FoodItem;
import com.example.entities.SubCategory;

public interface FoodItemRepository extends JpaRepository<FoodItem, Integer> {

	List<FoodItem> findBySubCategory_SubCategoryId(int subCategoryId);
  
    boolean existsByFoodNameAndSubCategory(
	        String foodName,
	        SubCategory subCategory
	    );
}
