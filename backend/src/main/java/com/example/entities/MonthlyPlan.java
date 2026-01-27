package com.example.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "monthly_plan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyPlan {
	
	@Id
	@Column(name="plan_id")
	int planId;
	
	@Column(name="plan_name")
	String planName;
	
	@Column(name="monthly_price")
	double monthlyPrice;
	
	@Column(name="meal_inclusion")
	String mealInclusion;         //Lunch, Dinner, Both
	
	@Column(name="validity_period")
	int validityPeriod;               // number of days the plan will be valid
	
	@ManyToOne
	@JoinColumn(name = "mess_id")
	private Mess mess;
	
	

}