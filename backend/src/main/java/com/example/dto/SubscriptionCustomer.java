package com.example.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionCustomer {

	private Long subscriptionId;
    private String userName;
    private String planName;
    private String mealInclusion;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
