package com.example.services;

import java.util.List;

import com.example.entities.MonthlyPlan;
import com.example.entities.Mess;

public interface MonthlyPlanService {
    List<MonthlyPlan> getPlansByMess(Mess mess);
    MonthlyPlan addPlan(MonthlyPlan plan);
    MonthlyPlan updatePlan(MonthlyPlan plan);
    void deletePlan(int planId);
    MonthlyPlan getPlanById(int planId);
}
