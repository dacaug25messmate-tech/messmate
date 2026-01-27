//package com.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.dto.FoodItemRequestDTO;
//import com.example.entities.FoodItemRequest;
//import com.example.entities.Mess;
//import com.example.entities.SubCategory;
//import com.example.repository.MessRepository;
//import com.example.repository.SubCategoryRepository;
//import com.example.services.FoodItemRequestService;
//
//@RestController
//@RequestMapping("/api/messowner")
//@CrossOrigin(origins = "http://localhost:3000")
//public class MessOwnerController {
//
//    @Autowired
//    private FoodItemRequestService service;
//
//    @Autowired
//    private SubCategoryRepository subCategoryRepository;
//
//    @Autowired
//    private MessRepository messRepository;
//
//    @PostMapping("/food-requests")
//    public ResponseEntity<?> createRequest(@RequestBody FoodItemRequestDTO dto) {
//
//        //  Validate DTO
//        if (dto.getMessId() == null) return ResponseEntity.badRequest().body("Mess ID is required");
//        if (dto.getSubCategoryId() == null) return ResponseEntity.badRequest().body("SubCategory ID is required");
//
//        //  Fetch related entities
//        SubCategory subCategory = subCategoryRepository
//                .findById(dto.getSubCategoryId())
//                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
//
//        Mess mess = messRepository
//                .findById(dto.getMessId())
//                .orElseThrow(() -> new RuntimeException("Mess not found"));
//
//        //  Create FoodItemRequest
//        FoodItemRequest req = new FoodItemRequest();
//        req.setItemName(dto.getFoodName());
//        req.setDescription(dto.getDescription());
//        req.setSubCategory(subCategory);
//        req.setMessId(mess);
//        req.setStatus("PENDING");
//
//        FoodItemRequest saved = service.saveRequest(req);
//        return ResponseEntity.ok(saved);
//    }
//}
package com.example.controllers;

import com.example.dto.MealMenuRequest;
import com.example.entities.MealMenu;
import com.example.entities.Mess;
import com.example.repository.MessRepository;
import com.example.services.MessOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

    // Add or update daily menu
    @PostMapping("/add")
    public MealMenu addMenu(@RequestBody MealMenuRequest request) {
        return messOwnerService.addOrUpdateDailyMenu(request);
    }

    // Fetch menu by mess and date
    @GetMapping("/fetch")
    public List<MealMenu> getMenu(
            @RequestParam Integer messId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return messOwnerService.getMenuByMessAndDate(messId, date);
    }

    // Fetch all menus of a mess
    @GetMapping("/all")
    public List<MealMenu> getAllMenus(
            @RequestParam Integer messId
    ) {
        return messOwnerService.getMenusByMess(messId);
    }
    
    @GetMapping("/messes/{ownerId}")
    public List<Mess> getMessesByOwner(@PathVariable Integer ownerId) {
        return messRepository.findByUserId(ownerId);
    }


}
