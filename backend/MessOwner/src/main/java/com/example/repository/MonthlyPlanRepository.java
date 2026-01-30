package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.MonthlyPlan;

public interface MonthlyPlanRepository extends JpaRepository<MonthlyPlan, Integer> {

    List<MonthlyPlan> findByMessMessId(Integer messId);
    
}
