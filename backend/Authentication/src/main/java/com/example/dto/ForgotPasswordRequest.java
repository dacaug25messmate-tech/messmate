package com.example.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ForgotPasswordRequest {
    private Integer userId;
    private Integer questionId;
    private String answer;
    private String newPassword;
}
