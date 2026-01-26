package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
