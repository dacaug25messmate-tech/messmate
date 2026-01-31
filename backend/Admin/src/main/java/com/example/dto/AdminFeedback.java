package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdminFeedback{

    private int ratingId;
    private String messName;
    private String messAddress;
    private String userName;
    private int rating;
    private String comments;

}