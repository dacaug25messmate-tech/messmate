package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.SubCategory;

public interface SubCategoryRepository 
        extends JpaRepository<SubCategory, Integer> {
}
