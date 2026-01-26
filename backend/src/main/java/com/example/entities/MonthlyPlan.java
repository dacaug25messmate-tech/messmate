package com.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monthly_plan")   // ⚠️ change to "plan" if your table name is plan
public class MonthlyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long planId;

    @Column(name = "mess_id")
    private Long messId;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "monthly_price")
    private Double monthlyPrice;

    @Column(name = "meal_inclusion")
    private String mealInclusion;

    @Column(name = "validity_period")
    private Integer validityPeriod;

    
}
