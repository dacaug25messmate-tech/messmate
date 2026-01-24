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

//    public AdminFeedback(
//        int ratingId,
//        String messName,
//        String messAddress,
//        String userName,
//        int rating,
//        String comments
//    ) {
//        this.ratingId = ratingId;
//        this.messName = messName;
//        this.messAddress = messAddress;
//        this.userName = userName;
//        this.rating = rating;
//        this.comments = comments;
//    }

    // getters only (setters optional)
}
