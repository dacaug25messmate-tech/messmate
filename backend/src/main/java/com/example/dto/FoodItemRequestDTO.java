package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FoodItemRequestDTO {

	private String foodName;
    private String description;
    private Integer subCategoryId; 
    private Integer messId;
}
