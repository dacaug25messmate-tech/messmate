package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Category;
import com.example.entities.FoodItem;
import com.example.entities.SubCategory;
import com.example.entities.User;
import com.example.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get pending registration requests
    //GET    http://localhost:2025/api/admin/pendingusers
    @GetMapping("/pendingusers")    
    public List<User> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    // Approve user
  //PUT    http://localhost:2025/api/admin/approve/5
    @PutMapping("/approve/{id}")         
    public User approveUser(@PathVariable int id) {
        return adminService.approveUser(id);
    }

    // Reject user
  //PUT    http://localhost:2025/api/admin/reject/5
    @PutMapping("/reject/{id}")
    public User rejectUser(@PathVariable int id) {
        return adminService.rejectUser(id);
    }
    
 // View all users
  //GET   http://localhost:2025/api/admin/viewusers
    @GetMapping("/viewusers")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
    
    // ================= CATEGORY MANAGEMENT =================

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return adminService.getAllCategories();
    }

    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category) {
        return adminService.addCategory(category);
    }

    // ================= SUBCATEGORY MANAGEMENT =================

    @GetMapping("/subcategories/{categoryId}")
    public List<SubCategory> getSubCategories(@PathVariable int categoryId) {
        return adminService.getSubCategoriesByCategory(categoryId);
    }

    @PostMapping("/subcategory/{categoryId}")
    public SubCategory addSubCategory(@PathVariable int categoryId, @RequestBody SubCategory subCategory) {
        return adminService.addSubCategory(categoryId, subCategory);
    }

    // ================= FOOD ITEM MANAGEMENT =================

    @GetMapping("/fooditems/{subCategoryId}")
    public List<FoodItem> getFoodItems(@PathVariable int subCategoryId) {
        return adminService.getFoodItemsBySubCategory(subCategoryId);
    }

    @PostMapping("/fooditem/{subCategoryId}")
    public FoodItem addFoodItem(@PathVariable int subCategoryId, @RequestBody FoodItem item) {
        return adminService.addFoodItem(subCategoryId, item);
    }

    @PutMapping("/fooditem/{id}")
    public FoodItem updateFoodItem(@PathVariable int id, @RequestBody FoodItem item) {
        return adminService.updateFoodItem(id, item);
    }

    @DeleteMapping("/fooditem/{id}")
    public void deleteFoodItem(@PathVariable int id) {
        adminService.deleteFoodItem(id);
    }

}
