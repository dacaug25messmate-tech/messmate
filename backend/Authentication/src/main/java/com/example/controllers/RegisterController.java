package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.RegisterRequest;
import com.example.dto.RegisterResponse;
import com.example.entities.Area;
import com.example.entities.City;
import com.example.entities.Question;
import com.example.repository.AreaRepository;
import com.example.repository.CityRepository;
import com.example.repository.QuestionRepository;
import com.example.services.RegisterService;

@RestController
@RequestMapping("/user")
public class RegisterController {

	@Autowired
	RegisterService rservice;
	
	@Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private CityRepository cityRepo;

    @Autowired
    private AreaRepository areaRepo;


	
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        try {
            RegisterResponse response = rservice.register(request);

            //  Validation failure (username/email exists)
            if ("FAILURE".equals(response.getStatus())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT) // 409
                        .body(response.getMessage());
            }

            //  Success
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error");
        }
    }
    
 // Fetch all security questions
    @GetMapping("/security-questions")
    public List<Question> getAllSecurityQuestions() {
        return questionRepo.findAll();
    }

    // Fetch all cities
    @GetMapping("/cities")
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }

    // Fetch areas for a selected city
    @GetMapping("/areas/{cityId}")
    public List<Area> getAreasByCity(@PathVariable Integer cityId) {
        return areaRepo.findByCityId_CityId(cityId); 
    }
}