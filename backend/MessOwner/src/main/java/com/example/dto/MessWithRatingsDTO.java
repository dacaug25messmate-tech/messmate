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
    private double averageRating;   // ⭐ ADD THIS
    private List<MessRatingDTO> ratings;
}
