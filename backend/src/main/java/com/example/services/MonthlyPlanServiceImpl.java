package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.MonthlyPlan;
import com.example.entities.Mess;
import com.example.repository.MonthlyPlanRepository;

@Service
public class MonthlyPlanServiceImpl implements MonthlyPlanService {

    @Autowired
    private MonthlyPlanRepository planRepo;

    @Override
    public List<MonthlyPlan> getPlansByMess(Mess mess) {
        return planRepo.findByMess(mess);
    }

    @Override
    public MonthlyPlan addPlan(MonthlyPlan plan) {
        return planRepo.save(plan);
    }

    @Override
    public MonthlyPlan updatePlan(MonthlyPlan plan) {
        return planRepo.save(plan);
    }

    @Override
    public void deletePlan(int planId) {
        planRepo.deleteById(planId);
    }

    @Override
    public MonthlyPlan getPlanById(int planId) {
        return planRepo.findById(planId).orElseThrow(() -> new RuntimeException("Plan not found"));
    }
}
