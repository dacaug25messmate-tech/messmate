package com.example.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "monthly_plan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyPlan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="plan_id")
	private int planId;
	
	@Column(name="plan_name")
	private String planName;
	
	@Column(name="monthly_price")
	private double monthlyPrice;
	
	@Column(name="meal_inclusion")
	private String mealInclusion; // Lunch, Dinner, Both
	
	@Column(name="validity_period")
	private int validityPeriod;
	
	@ManyToOne
	@JoinColumn(name = "mess_id")
	private Mess mess;
}
