package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminFoodItemRequestDTO {

    private Integer requestId;
    private String itemName;
    private String description;
    private String messOwnerName;
    private String subCategoryName;
}
