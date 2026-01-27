package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Integer> {

    List<FoodItem> findBySubCategoryId_SubCategoryId(int subCategoryId);
}
