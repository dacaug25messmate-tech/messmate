package com.example.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.MealMenuRequest;
import com.example.entities.FoodItem;
import com.example.entities.MealMenu;
import com.example.entities.MealMenuFoodItem;
import com.example.entities.Mess;
import com.example.repository.FoodItemRepository;
import com.example.repository.MealMenuFoodItemRepository;
import com.example.repository.MealMenuRepository;
import com.example.repository.MessRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MessOwnerService {

    @Autowired
    private MealMenuRepository mealMenuRepository;

    @Autowired
    private MealMenuFoodItemRepository mealMenuFoodItemRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private MessRepository messRepository;

    public MealMenu addOrUpdateDailyMenu(MealMenuRequest request) {

        MealMenu menu = mealMenuRepository
                .findByMess_MessIdAndMenuDateAndMenuType(
                        request.getMessId(),
                        request.getMenuDate(),
                        request.getMenuType()
                )
                .orElse(new MealMenu());

        Mess mess = messRepository.findById(request.getMessId())
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
