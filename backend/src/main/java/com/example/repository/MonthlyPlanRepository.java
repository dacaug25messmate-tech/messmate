package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.MonthlyPlan;
import com.example.entities.Mess;

@Repository
public interface MonthlyPlanRepository extends JpaRepository<MonthlyPlan, Integer> {
    List<MonthlyPlan> findByMess(Mess mess);
}
