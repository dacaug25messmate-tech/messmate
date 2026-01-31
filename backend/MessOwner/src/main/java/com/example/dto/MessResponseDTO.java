package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessResponseDTO {
    private Integer messId;
    private String messName;
    private String messAddress;
    private String messType;
    private String lunchOpenTime;
    private String lunchCloseTime;
    private String dinnerOpenTime;
    private String dinnerCloseTime;
    private String areaName; // Instead of full Area object
    private String cityName; // Optional
}