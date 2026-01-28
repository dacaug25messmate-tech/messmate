package com.example.controllers;

import com.example.dto.MealMenuRequest;
import com.example.dto.MessRequestDTO;
import com.example.entities.MealMenu;
import com.example.entities.Mess;
import com.example.repository.MessRepository;
import com.example.services.MessOwnerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/messowner")
@CrossOrigin(origins = "http://localhost:3000")
public class MessOwnerController {

    @Autowired
    private MessOwnerService messOwnerService;

    @Autowired
    private MessRepository messRepository;

    //  Add or update daily menu
    @PostMapping("/add")
    public MealMenu addMenu(@RequestBody MealMenuRequest request) {
        return messOwnerService.addOrUpdateDailyMenu(request);
    }

    //  Fetch menu by mess and date
    @GetMapping("/fetch")
    public List<MealMenu> getMenu(
            @RequestParam Integer messId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return messOwnerService.getMenuByMessAndDate(messId, date);
    }

    //  Fetch all menus of a mess
    @GetMapping("/all")
    public List<MealMenu> getAllMenus(@RequestParam Integer messId) {
        return messOwnerService.getMenusByMess(messId);
    }

    //  Fetch messes by owner
    @GetMapping("/messes/{ownerId}")
    public List<Mess> getMessesByOwner(@PathVariable Integer ownerId) {
        return messRepository.findByUserId(ownerId);
    }

    // Add mess (from Gayatri branch)
    @PostMapping("/mess")
    public ResponseEntity<?> addMess(@RequestBody MessRequestDTO dto) {
        try {
            Mess savedMess = messOwnerService.addMess(dto);
            return ResponseEntity.ok(savedMess);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
