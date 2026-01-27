package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entities.Rating;
import com.example.services.MessOwnerService;


@RestController
@RequestMapping("/mess-owner")
@CrossOrigin(origins = "http://localhost:3000")
public class MessOwnerRatingController {

    @Autowired
    private MessOwnerService messOwnerService;

    @GetMapping("/ratings/{userId}")
    public List<Rating> getRatingsByMessOwner(@PathVariable int userId) {
        return messOwnerService.getRatingsByMessOwnerUserId(userId);
    }
}
