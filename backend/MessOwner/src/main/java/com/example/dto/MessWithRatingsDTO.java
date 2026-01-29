package com.example.dto;

import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessWithRatingsDTO {

    private Integer messId;
    private String messName;
    private List<MessRatingDTO> ratings;
}