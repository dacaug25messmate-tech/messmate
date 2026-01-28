package com.example.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.MealMenuRequest;
import com.example.dto.MessOwnerProfileDTO;
import com.example.dto.MessRequestDTO;
import com.example.entities.Area;
import com.example.entities.FoodItem;
import com.example.entities.MealMenu;
import com.example.entities.MealMenuFoodItem;
import com.example.entities.Mess;
import com.example.entities.User;
import com.example.repository.AreaRepository;
import com.example.repository.FoodItemRepository;
import com.example.repository.MealMenuFoodItemRepository;
import com.example.repository.MealMenuRepository;
import com.example.repository.MessRepository;
import com.example.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MessOwnerService {

    // ---------------------------
    // Repositories
    // ---------------------------

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MessRepository messRepo;

    @Autowired
    private AreaRepository areaRepo;

    @Autowired
    private MealMenuRepository mealMenuRepository;

    @Autowired
    private MealMenuFoodItemRepository mealMenuFoodItemRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    // ---------------------------
    // Mess Owner Profile
    // ---------------------------

    public MessOwnerProfileDTO getMessOwnerProfile(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Mess> messList = messRepo.findByUserId(user);

        MessOwnerProfileDTO dto = new MessOwnerProfileDTO();
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUserName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());

        if (!messList.isEmpty()) {
            Mess mess = messList.get(0);
            dto.setMessName(mess.getMessName());
            dto.setMessAddress(mess.getMessAddress());
            dto.setMessType(mess.getMessType());
            dto.setLunchTime(mess.getLunchOpenTime() + " - " + mess.getLunchCloseTime());
            dto.setDinnerTime(mess.getDinnerOpenTime() + " - " + mess.getDinnerCloseTime());
            if (mess.getAreaId() != null) {
                dto.setAreaName(mess.getAreaId().getArea_name());
            }
        }

        return dto;
    }

    // ---------------------------
    // Mess CRUD
    // ---------------------------

    public Mess addMess(MessRequestDTO dto) {
        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Area area = areaRepo.findById(dto.getAreaId())
                .orElseThrow(() -> new RuntimeException("Area not found"));

        Mess mess = new Mess();
        mess.setUserId(user);
        mess.setAreaId(area);
        mess.setMessName(dto.getMessName());
        mess.setMessAddress(dto.getMessAddress());
        mess.setMessType(dto.getMessType());
        mess.setLunchOpenTime(LocalTime.parse(dto.getLunchOpenTime()));
        mess.setLunchCloseTime(LocalTime.parse(dto.getLunchCloseTime()));
        mess.setDinnerOpenTime(LocalTime.parse(dto.getDinnerOpenTime()));
        mess.setDinnerCloseTime(LocalTime.parse(dto.getDinnerCloseTime()));

        return messRepo.save(mess);
    }

    public Mess updateMess(MessRequestDTO dto) {
        Mess mess = messRepo.findById(dto.getMessId())
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        mess.setMessName(dto.getMessName());
        mess.setMessAddress(dto.getMessAddress());
        mess.setMessType(dto.getMessType());
        mess.setLunchOpenTime(LocalTime.parse(dto.getLunchOpenTime()));
        mess.setLunchCloseTime(LocalTime.parse(dto.getLunchCloseTime()));
        mess.setDinnerOpenTime(LocalTime.parse(dto.getDinnerOpenTime()));
        mess.setDinnerCloseTime(LocalTime.parse(dto.getDinnerCloseTime()));

        if (dto.getAreaId() != null) {
            Area area = areaRepo.findById(dto.getAreaId())
                    .orElseThrow(() -> new RuntimeException("Area not found"));
            mess.setAreaId(area);
        }

        return messRepo.save(mess);
    }

    public void deleteMess(Integer messId) {
        Mess mess = messRepo.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found"));
        messRepo.delete(mess);
    }

    public List<Mess> getAllMessesByUser(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messRepo.findAllByUserId(user);
    }

    // ---------------------------
    // Meal Menu
    // ---------------------------

    public MealMenu addOrUpdateDailyMenu(MealMenuRequest request) {

        MealMenu menu = mealMenuRepository
                .findByMess_MessIdAndMenuDateAndMenuType(
                        request.getMessId(),
                        request.getMenuDate(),
                        request.getMenuType()
                )
                .orElse(new MealMenu());

        Mess mess = messRepo.findById(request.getMessId())
                .orElseThrow(() -> new RuntimeException("Mess not found"));

        menu.setMess(mess);
        menu.setMenuDate(request.getMenuDate());
        menu.setMenuType(request.getMenuType());

        menu = mealMenuRepository.save(menu);

        mealMenuFoodItemRepository.deleteByMealMenu_MenuId(menu.getMenuId());

        if (request.getFoodItemIds() != null && !request.getFoodItemIds().isEmpty()) {
            for (Integer foodId : request.getFoodItemIds()) {

                FoodItem foodItem = foodItemRepository.findById(foodId)
                        .orElseThrow(() -> new RuntimeException("Food item not found"));

                MealMenuFoodItem mmfi = new MealMenuFoodItem();
                mmfi.setMealMenu(menu);
                mmfi.setFoodItem(foodItem);

                mealMenuFoodItemRepository.save(mmfi);
            }
        }

        return menu;
    }

    public List<MealMenu> getMenuByMessAndDate(Integer messId, LocalDate date) {
        return mealMenuRepository.findByMess_MessIdAndMenuDate(messId, date);
    }

    public List<MealMenu> getMenusByMess(Integer messId) {
        return mealMenuRepository.findByMess_MessId(messId);
    }
}
