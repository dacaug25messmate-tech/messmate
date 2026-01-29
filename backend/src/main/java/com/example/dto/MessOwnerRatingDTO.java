package com.example.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessOwnerRatingDTO {

    private Integer ratingId;
    private Integer messId;
    private String messName;
    private String userName;
    private Integer rating;
    private String comments;
}

