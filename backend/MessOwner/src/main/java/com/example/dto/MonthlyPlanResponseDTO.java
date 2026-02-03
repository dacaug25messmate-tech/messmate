package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyPlanResponseDTO {

	private Integer planId;
    private String planName;
    private double monthlyPrice;
    private String mealInclusion;
    private int validityPeriod;

    private Integer messId;
    private String messName;
    private long activeSubscriberCount;
}
