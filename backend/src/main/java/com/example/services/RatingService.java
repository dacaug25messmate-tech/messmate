package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Rating;
import com.example.repository.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;


    public List<Rating> getRatingsByMess(int messId) {
        return ratingRepository.findByMess_MessId(messId);
    }
}
