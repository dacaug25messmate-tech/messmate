//package com.example.controllers;
//
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.entities.Area;
//import com.example.repository.AreaRepository;
//
//@RestController
//@RequestMapping("/api/areas")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AreaController {
//
//    @Autowired
//    private AreaRepository areaRepo;
//
//    // Get all areas (if city not needed)
//    @GetMapping
//    public List<Area> getAllAreas() {
//        return areaRepo.findAll();
//    }
//
//    // Get areas by city
//    @GetMapping("by-city/{cityId}")
//    public List<Area> getAreasByCities(@PathVariable Integer cityId) {
//        return areaRepo.findByCityId_CityId(cityId);
//    }
//}
