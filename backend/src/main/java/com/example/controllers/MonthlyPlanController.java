//package com.example.controllers;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.entities.MonthlyPlan;
//import com.example.entities.Mess;
//import com.example.repository.MessRepository;
//import com.example.services.MonthlyPlanService;
//
//@RestController
//@RequestMapping("/api/monthlyplans")
//@CrossOrigin(origins = "http://localhost:3000") // React frontend
//public class MonthlyPlanController {
//
//    @Autowired
//    private MonthlyPlanService planService;
//
//    @Autowired
//    private MessRepository messRepo;
//
//    // Get all plans for a specific mess
//    @GetMapping("/mess/{messId}")
//    public List<MonthlyPlan> getPlansByMess(@PathVariable Integer messId) {
//        Mess mess = messRepo.findById(messId).orElseThrow(() -> new RuntimeException("Mess not found"));
//        return planService.getPlansByMess(mess);
//    }
//
//    // Add new plan
//    @PostMapping
//    public MonthlyPlan addPlan(@RequestBody MonthlyPlan plan) {
//        return planService.addPlan(plan);
//    }
//
//    // Update plan
//    @PutMapping("/{planId}")
//    public MonthlyPlan updatePlan(@PathVariable Integer planId, @RequestBody MonthlyPlan plan) {
//        MonthlyPlan existing = planService.getPlanById(planId);
//        existing.setPlanName(plan.getPlanName());
//        existing.setMonthlyPrice(plan.getMonthlyPrice());
//        existing.setMealInclusion(plan.getMealInclusion());
//        existing.setValidityPeriod(plan.getValidityPeriod());
//        // messId optional if you want to allow changing mess
//        return planService.updatePlan(existing);
//    }
//
//    // Delete plan
//    @DeleteMapping("/{planId}")
//    public String deletePlan(@PathVariable Integer planId) {
//        planService.deletePlan(planId);
//        return "Deleted plan with ID: " + planId;
//    }
//}
