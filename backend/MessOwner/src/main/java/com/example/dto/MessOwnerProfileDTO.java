package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessOwnerProfileDTO {

	  // User details
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String address;

    // Mess details
    private String messName;
    private String messAddress;
    private String messType;
    private String lunchTime;
    private String dinnerTime;
    private String areaName;

    // constructor, getters, setters
}
