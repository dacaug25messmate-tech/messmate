package com.example.dto;

import lombok.Data;

@Data
public class MonthlyPlanRequestDTO {
    private String planName;
    private double monthlyPrice;
    private String mealInclusion;
    private int validityPeriod;
    private int messId;
}
