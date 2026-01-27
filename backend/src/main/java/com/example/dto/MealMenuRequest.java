package com.example.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class MealMenuRequest {

	private Integer messId;
    private LocalDate menuDate;
    private String menuType;
    private List<Integer> foodItemIds;

}
