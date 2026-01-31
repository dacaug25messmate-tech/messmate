package com.example.repository;

import com.example.entities.MealMenuFoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealMenuFoodItemRepository extends JpaRepository<MealMenuFoodItem, Integer> {
    
    // Get all food items for a menu
    List<MealMenuFoodItem> findByMealMenuMenuId(Integer menuId);
    
    // delete all food items of a menu
    void deleteByMealMenu_MenuId(Integer menuId);

}
