package com.example.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.MealMenuRequest;
import com.example.dto.MessOwnerProfileDTO;
import com.example.dto.MessRatingDTO;
import com.example.dto.MessRequestDTO;
import com.example.dto.MessWithRatingsDTO;
import com.example.entities.Area;
import com.example.entities.FoodItem;
import com.example.entities.MealMenu;
import com.example.entities.MealMenuFoodItem;
import com.example.entities.Mess;
import com.example.entities.Rating;
import com.example.entities.Subscription;
import com.example.entities.User;
import com.example.repository.AreaRepository;
import com.example.repository.FoodItemRepository;
import com.example.repository.MealMenuFoodItemRepository;
import com.example.repository.MealMenuRepository;
import com.example.repository.MessRepository;
import com.example.repository.RatingRepository;
import com.example.repository.SubscriptionRepository;
import com.example.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MessOwnerService {

	
	@Autowired
    private SubscriptionRepository subscriptionRepository;


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
    
    @Autowired
    private RatingRepository ratingRepository;

   
    // Mess Owner Profile
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

  
   		// Mess CRUD
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

    
    // Meal Menu
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
    
    
    public List<MessWithRatingsDTO> getMessesWithRatings(int ownerId) {

        List<Mess> messes = messRepo.findByUserId_Userid(ownerId);
        List<MessWithRatingsDTO> response = new ArrayList<>();

        for (Mess mess : messes) {

            List<Rating> ratings = ratingRepository.findByMess_MessId(mess.getMessId());

            List<MessRatingDTO> ratingDTOs = ratings.stream()
                    .map(r -> new MessRatingDTO(
                            r.getRatingId(),
                            r.getUser().getUserName(),
                            r.getRating(),
                            r.getComments()
                    ))
                    .toList();

            response.add(new MessWithRatingsDTO(
                    mess.getMessId(),
                    mess.getMessName(),
                    ratingDTOs
            ));
        }

        return response;
    }
    
    

    public List<Subscription> getRegisteredCustomers(int messId) {
        return subscriptionRepository.findActiveSubscriptionsByMessId(messId);
    }
    

    
    public List<MealMenu> getMenuByMessAndDate(Integer messId, LocalDate date) {
        return mealMenuRepository.findByMess_MessIdAndMenuDate(messId, date);
    }

    public List<MealMenu> getMenusByMess(Integer messId) {
        return mealMenuRepository.findByMess_MessId(messId);
    }
    
    
    
    public List<Mess> getMessByUser(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messRepo.findByUserId(user);
    }
    
    

    public Mess getMessById(Integer messId) {
        return messRepo.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found"));
    }

   
}
