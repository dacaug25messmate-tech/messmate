package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dto.AdminFeedback;
import com.example.repository.RatingRepository;

@Service
public class AdminFeedbackService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<AdminFeedback> getAllFeedback() {
        return ratingRepository.getAllFeedbackForAdmin();
    }
}
