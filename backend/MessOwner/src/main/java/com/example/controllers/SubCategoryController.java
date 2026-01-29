package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entities.SubCategory;
import com.example.repository.SubCategoryRepository;

@RestController
@RequestMapping("/api/subcategories")
public class SubCategoryController {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @GetMapping
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }
}
