package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessOwnerProfileUpdateDTO {

    private Integer userId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
}
