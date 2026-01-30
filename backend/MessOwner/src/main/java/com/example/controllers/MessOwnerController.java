package com.example.controllers;

import com.example.entities.MessPhoto;
import com.example.entities.MonthlyPlan;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.example.dto.FoodItemRequestDTO;
import com.example.dto.MealMenuRequest;
import com.example.dto.MessOwnerProfileUpdateDTO;
import com.example.dto.MessRequestDTO;
import com.example.dto.MessResponseDTO;
import com.example.dto.MessWithRatingsDTO;
import com.example.dto.MonthlyPlanRequestDTO;
import com.example.dto.MonthlyPlanResponseDTO;
import com.example.entities.FoodItemRequest;
import com.example.entities.MealMenu;
import com.example.entities.Mess;
import com.example.entities.SubCategory;
import com.example.repository.MessRepository;
import com.example.repository.SubCategoryRepository;
import com.example.services.FoodItemRequestService;
import com.example.services.MessOwnerService;
import com.example.services.MonthlyPlanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/messowner")
public class MessOwnerController {

	@Autowired
	private FoodItemRequestService foodservice;
	 
    @Autowired
    private MessOwnerService messOwnerService;

    @Autowired
    private SubCategoryRepository subCategoryRepository;
    
    @Autowired
    private MessRepository messRepository;

    @Autowired
    private MonthlyPlanService monthlyPlanService;
    //  Add or update daily menu
    @PostMapping("/add")
    public MealMenu addMenu(@RequestBody MealMenuRequest request) {
        return messOwnerService.addOrUpdateDailyMenu(request);
    }


    @GetMapping("/messes/ratings/{ownerId}")
    public List<MessWithRatingsDTO> getAllMessesWithRatings(
            @PathVariable int ownerId) {

        return messOwnerService.getMessesWithRatings(ownerId);
    }
    
    
    @PostMapping("/food-requests")
    public ResponseEntity<?> createRequest(@RequestBody FoodItemRequestDTO dto) {

        if (dto.getUserId() == null)
            return ResponseEntity.badRequest().body("User ID is required");

        if (dto.getSubCategoryId() == null)
            return ResponseEntity.badRequest().body("SubCategory ID is required");

        FoodItemRequest saved = foodservice.createRequest(dto, dto.getUserId());
        return ResponseEntity.ok(saved);
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
    
    

    //GET http://localhost:2028/api/messowner/customers/{messId}
    @GetMapping("/customers/{messId}")
    public ResponseEntity<?> getRegisteredCustomers(
            @PathVariable int messId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date,
            @RequestParam String mealType
    ) {
        return ResponseEntity.ok(
            messOwnerService.getRegisteredCustomers(messId, date, mealType)
        );
    }

    
 // GET SINGLE MESS
    @GetMapping("/mess/details/{messId}")
    public ResponseEntity<MessResponseDTO> getMessDetails(@PathVariable Integer messId) {
        Mess mess = messOwnerService.getMessById(messId);
        return ResponseEntity.ok(mapToDTO(mess));
    }
    


    //  Fetch all menus of a mess
    @GetMapping("/all")
    public List<MealMenu> getAllMenus(@RequestParam Integer messId) {
        return messOwnerService.getMenusByMess(messId);
    }

    
    
    @GetMapping("/messes/{ownerId}")
    public ResponseEntity<List<MessResponseDTO>> getMessesByOwner(@PathVariable Integer ownerId) {

        List<Mess> messList = messRepository.findByUserIdInt(ownerId);

        List<MessResponseDTO> response = messList.stream()
                .map(this::mapToDTO)
                .toList();

        return ResponseEntity.ok(response);
    }

    
   

    // UPDATE MESS
    @PutMapping("/mess")
    public ResponseEntity<?> updateMess(@RequestBody MessRequestDTO dto) {
        try {
            Mess updatedMess = messOwnerService.updateMess(dto);
            return ResponseEntity.ok(mapToDTO(updatedMess));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
    
    @GetMapping("/monthly-plans/{messId}")
    public List<MonthlyPlanResponseDTO> getPlansByMess(
            @PathVariable Integer messId) {
        return monthlyPlanService.getPlansByMess(messId);
    }

    @PostMapping("/monthly-plans/add")
    public MonthlyPlan addPlan(
            @RequestBody MonthlyPlanRequestDTO dto) {
        return monthlyPlanService.addPlan(dto);
    }

    @PutMapping("/monthly-plans/update/{planId}")
    public MonthlyPlan updatePlan(
            @PathVariable Integer planId,
            @RequestBody MonthlyPlan plan) {
        return monthlyPlanService.updatePlan(planId, plan);
    }

    @DeleteMapping("/monthly-plans/delete/{planId}")
    public ResponseEntity<?> deletePlan(
            @PathVariable Integer planId) {
        monthlyPlanService.deletePlan(planId);
        return ResponseEntity.ok("Plan deleted successfully");
    }

    
    @PostMapping("/mess")
    public ResponseEntity<MessResponseDTO> addMess(@RequestBody MessRequestDTO dto) {
        Mess savedMess = messOwnerService.addMess(dto);
        return ResponseEntity.ok(mapToDTO(savedMess));
    }
 // DELETE MESS
    @DeleteMapping("/mess/{messId}")
    public ResponseEntity<?> deleteMess(@PathVariable Integer messId) {
        try {
            messOwnerService.deleteMess(messId);
            return ResponseEntity.ok("Mess deleted successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/customer-visit")
    public ResponseEntity<?> markCustomerVisit(
        @RequestParam int subscriptionId,
        @RequestParam
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate date,
        @RequestParam String mealType,
        @RequestParam boolean visited
    ) {
        return ResponseEntity.ok(
            messOwnerService.markCustomerVisit(
                subscriptionId, date, mealType, visited
            )
        );
    }
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable int userId){
    	return ResponseEntity.ok(messOwnerService.getMessOwnerProfile(userId));
    }
    
    @PutMapping("/profile/update")
    public ResponseEntity<?> updateProfile(
            @RequestBody MessOwnerProfileUpdateDTO dto) {

        try {
            return ResponseEntity.ok(
                    messOwnerService.updateMessOwnerProfile(dto)
            );
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    
    
    private MessResponseDTO mapToDTO(Mess mess) {
        String areaName = mess.getAreaId() != null ? mess.getAreaId().getArea_name() : "";
        String cityName = (mess.getAreaId() != null && mess.getAreaId().getCityId() != null)
                ? mess.getAreaId().getCityId().getCityName()
                : "";

        return new MessResponseDTO(
                mess.getMessId(),
                mess.getMessName(),
                mess.getMessAddress(),
                mess.getMessType(),
                mess.getLunchOpenTime() != null ? mess.getLunchOpenTime().toString() : "",
                mess.getLunchCloseTime() != null ? mess.getLunchCloseTime().toString() : "",
                mess.getDinnerOpenTime() != null ? mess.getDinnerOpenTime().toString() : "",
                mess.getDinnerCloseTime() != null ? mess.getDinnerCloseTime().toString() : "",
                areaName,
                cityName
        );
    }
    @PostMapping("/mess/photo/upload")
    public ResponseEntity<?> uploadMessPhoto(
            @RequestParam Integer messid,
            @RequestParam("photo") MultipartFile photo
    ) {
        try {
            // 1. Save file locally (example folder)
            String uploadDir = "uploads/mess-photos/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, photo.getBytes());

            // 2. Create URL (this is what you store in DB)
            String photoUrl = "http://localhost:2025/" + uploadDir + fileName;

            // 3. Save in DB
            MessPhoto savedPhoto = messOwnerService.addMessPhoto(messid, photoUrl);

            return ResponseEntity.ok(savedPhoto);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Photo upload failed");
        }
    }
}
