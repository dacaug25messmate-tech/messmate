package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.MonthlyPlanRequestDTO;
import com.example.dto.MonthlyPlanResponseDTO;
import com.example.entities.Mess;
import com.example.entities.MonthlyPlan;
import com.example.repository.MessRepository;
import com.example.repository.MonthlyPlanRepository;

@Service
public class MonthlyPlanService {

    @Autowired
    private MonthlyPlanRepository planRepo;

    @Autowired
    private MessRepository messRepo;

    // ADD PLAN
    public MonthlyPlan addPlan(Integer messId, MonthlyPlan plan) {

        Mess mess = messRepo.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        plan.setMess(mess);
        return planRepo.save(plan);
    }

    // UPDATE PLAN
    public MonthlyPlan updatePlan(Integer planId, MonthlyPlan plan) {

        MonthlyPlan existing = planRepo.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        existing.setPlanName(plan.getPlanName());
        existing.setMonthlyPrice(plan.getMonthlyPrice());
        existing.setMealInclusion(plan.getMealInclusion());
        existing.setValidityPeriod(plan.getValidityPeriod());

        return planRepo.save(existing);
    }

    // DELETE PLAN
    public void deletePlan(Integer planId) {
        planRepo.deleteById(planId);
    }

    // ✅ GET PLANS WITH MESS NAME
    public List<MonthlyPlanResponseDTO> getPlansByMess(Integer messId) {

        List<MonthlyPlan> plans = planRepo.findByMessMessId(messId);

        return plans.stream().map(plan ->
                new MonthlyPlanResponseDTO(
                        plan.getPlanId(),
                        plan.getPlanName(),
                        plan.getMonthlyPrice(),
                        plan.getMealInclusion(),
                        plan.getValidityPeriod(),
                        plan.getMess().getMessId(),
                        plan.getMess().getMessName()
                )
        ).toList();
    }

    public MonthlyPlan addPlan(MonthlyPlanRequestDTO dto) {
        Mess mess = messRepo.findById(dto.getMessId())
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        MonthlyPlan plan = new MonthlyPlan();
        plan.setPlanName(dto.getPlanName());
        plan.setMonthlyPrice(dto.getMonthlyPrice());
        plan.setMealInclusion(dto.getMealInclusion());
        plan.setValidityPeriod(dto.getValidityPeriod());
        plan.setMess(mess);

        return planRepo.save(plan);
    }

}

