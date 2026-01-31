package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {

    List<SubCategory> findByCategoryId_CategoryId(int categoryId);
}
