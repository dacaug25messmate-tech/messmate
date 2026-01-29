package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessRequestDTO {

    private Integer userId;
    private String messName;
    private String messAddress;
    private String messType;
    private Integer messId;
    private String lunchOpenTime;
    private String lunchCloseTime;

    private String dinnerOpenTime;
    private String dinnerCloseTime;
    private Integer areaId;
}
