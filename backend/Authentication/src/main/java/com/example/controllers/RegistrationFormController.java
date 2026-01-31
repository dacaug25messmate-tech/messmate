//package com.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.entities.Area;
//import com.example.entities.City;
//import com.example.entities.Question;
//import com.example.repository.AreaRepository;
//import com.example.repository.CityRepository;
//import com.example.repository.QuestionRepository;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class RegistrationFormController {
//
//    @Autowired
//    private QuestionRepository questionRepo;
//
//    @Autowired
//    private CityRepository cityRepo;
//
//    @Autowired
//    private AreaRepository areaRepo;
//
//    // Fetch all security questions
//    @GetMapping("/security-questions")
//    public List<Question> getAllSecurityQuestions() {
//        return questionRepo.findAll();
//    }
//
//    // Fetch all cities
//    @GetMapping("/cities")
//    public List<City> getAllCities() {
//        return cityRepo.findAll();
//    }
//
//    // Fetch areas for a selected city
//    @GetMapping("/areas/{cityId}")
//    public List<Area> getAreasByCity(@PathVariable Integer cityId) {
//        return areaRepo.findByCityId_CityId(cityId); 
//    }
//}