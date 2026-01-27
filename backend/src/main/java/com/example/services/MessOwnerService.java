package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Mess;
import com.example.entities.Rating;
import com.example.repository.MessRepository;
import com.example.repository.RatingRepository;

@Service
public class MessOwnerService{

    @Autowired
    private MessRepository messRepository;

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> getRatingsByMessOwnerUserId(int userId) {

        // 1. find mess by mess owner userId
        Mess mess = messRepository.findByUserId_Userid(userId);

        if (mess == null) {
            throw new RuntimeException("Mess not found for this owner");
        }

        // 2. get ratings of that mess
        return ratingRepository.findByMess_MessId(mess.getMessId());
    }
}

