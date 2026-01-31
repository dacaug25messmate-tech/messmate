package com.example.dto;


import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOrderDTO {

    private int subscriptionId;
    private String fullName;
    private String phone;
    private String mealType;
    private String visitStatus; // VISITED / UNVISITED / null
    private LocalDate startDate;
    private LocalDate endDate;
}
