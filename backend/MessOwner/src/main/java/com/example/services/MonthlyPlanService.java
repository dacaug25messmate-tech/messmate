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
import com.example.repository.SubscriptionRepository;

@Service
public class MonthlyPlanService {

    @Autowired
    private MonthlyPlanRepository planRepo;

    @Autowired
    private MessRepository messRepo;
    
    @Autowired
    SubscriptionRepository subscriptionRepo;

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

        // 1️⃣ Check if plan exists
        MonthlyPlan plan = planRepo.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // 2️⃣ Check dependent users (ACTIVE subscriptions)
        long activeSubscriptions =
                subscriptionRepo.countActiveSubscriptionsByPlanId(planId);

        // 3️⃣ Block deletion if dependent users exist
        if (activeSubscriptions > 0) {
            throw new RuntimeException(
                "This plan has active subscribers and cannot be deleted"
            );
        }

        // 4️⃣ Safe to delete
        planRepo.delete(plan);
    }

    //  GET PLANS WITH MESS NAME
    public List<MonthlyPlanResponseDTO> getPlansByMess(Integer messId) {

        List<MonthlyPlan> plans = planRepo.findByMessMessId(messId);

        return plans.stream().map(plan -> {

            long activeCount =
                subscriptionRepo.countActiveSubscriptionsByPlanId(
                    plan.getPlanId()
                );

            return new MonthlyPlanResponseDTO(
                    plan.getPlanId(),
                    plan.getPlanName(),
                    plan.getMonthlyPrice(),
                    plan.getMealInclusion(),
                    plan.getValidityPeriod(),
                    plan.getMess().getMessId(),
                    plan.getMess().getMessName(),
                    activeCount
            );
        }).toList();
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

