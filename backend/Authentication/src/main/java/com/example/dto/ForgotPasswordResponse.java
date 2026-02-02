package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ForgotPasswordResponse {
    private String status;    // SUCCESS, USER_NOT_FOUND, INVALID_ANSWER, ACCOUNT_LOCKED
    private String message;
}
