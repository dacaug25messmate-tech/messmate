package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Category;
import com.example.entities.FoodItem;
import com.example.entities.SubCategory;
import com.example.entities.User;
import com.example.repository.CategoryRepository;
import com.example.repository.FoodItemRepository;
import com.example.repository.SubCategoryRepository;
import com.example.repository.UserRepository;

@Service
public class AdminService {

	 @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private CategoryRepository categoryRepository;

	    @Autowired
	    private SubCategoryRepository subCategoryRepository;

	    @Autowired
	    private FoodItemRepository foodItemRepository;

	    // Fetch users with PENDING status
	    public List<User> getPendingUsers() {
	        return userRepository.findByStatus("PENDING");
	    }

	    // Approve user
	    public User approveUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setStatus("APPROVED");
	        user.setActiveStatus("ACTIVE");
	        return userRepository.save(user);
	    }

	    // Reject user
	    public User rejectUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setStatus("REJECTED");
	        return userRepository.save(user);
	    }
	    
	    // View all users
	 // View only APPROVED users
//	    public List<User> getAllUsers() {
//	        return userRepository.findByStatus("APPROVED");
//	    }
	    
	    // ================= CATEGORY MANAGEMENT =================

	    public List<Category> getAllCategories() {
	        return categoryRepository.findAll();
	    }

	    public Category addCategory(Category category) {
	        return categoryRepository.save(category);
	    }

	    // ================= SUBCATEGORY MANAGEMENT =================

	    public List<SubCategory> getSubCategoriesByCategory(int categoryId) {
	        return subCategoryRepository.findByCategoryId_CategoryId(categoryId);
	    }

	    public SubCategory addSubCategory(int categoryId, SubCategory subCategory) {
	        Category category = categoryRepository.findById(categoryId)
	                .orElseThrow(() -> new RuntimeException("Category not found"));
	        subCategory.setCategoryId(category);
	        return subCategoryRepository.save(subCategory);
	    }

	    // ================= FOOD ITEM MANAGEMENT =================

	    public List<FoodItem> getFoodItemsBySubCategory(int subCategoryId) {
	        return foodItemRepository.findBySubCategory_SubCategoryId(subCategoryId);
	    }

	    public FoodItem addFoodItem(int subCategoryId, FoodItem item) {
	        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
	                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
	        item.setSubCategory(subCategory);
	        return foodItemRepository.save(item);
	    }

	    public FoodItem updateFoodItem(int id, FoodItem updated) {
	        FoodItem item = foodItemRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("FoodItem not found"));
	        item.setFoodName(updated.getFoodName());
	        item.setDescription(updated.getDescription());
	        return foodItemRepository.save(item);
	    }

	    public void deleteFoodItem(int id) {
	        foodItemRepository.deleteById(id);
	    }
	    
	    public List<User> getAllUsers() {
	        return userRepository.findByStatusAndRoleId_RoleNameIn(
	                "APPROVED",
	                List.of("CUSTOMER", "MESSOWNER")
	        );
	    }

	    public User disableUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setActiveStatus("INACTIVE");
	        return userRepository.save(user);
	    }

	    public User enableUser(int userId) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        user.setActiveStatus("ACTIVE");
	        return userRepository.save(user);
	    }



}

