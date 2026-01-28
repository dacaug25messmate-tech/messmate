package com.example.services;

import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.MessOwnerProfileDTO;
import com.example.dto.MessRequestDTO;
import com.example.entities.Area;

import com.example.entities.Mess;
import com.example.entities.User;
import com.example.repository.AreaRepository;
import com.example.repository.CityRepository;
import com.example.repository.MessRepository;
import com.example.repository.UserRepository;

@Service
public class MessOwnerService{

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MessRepository messRepo;

    @Autowired
    private AreaRepository areaRepo;
    @Autowired
    private CityRepository cityRepo;

    // ---------------------------
    // Get Mess Owner Profile
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
    // Add Mess (multiple allowed)
    // ---------------------------
   

     
    
    public Mess addMess(MessRequestDTO dto) {

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Area area = areaRepo.findById(dto.getAreaId())
                .orElseThrow(() -> new RuntimeException("Area not found"));

        Mess mess = new Mess();
        mess.setUserId(user);          // ✅ IMPORTANT
        mess.setAreaId(area);          // ✅ IMPORTANT
        mess.setMessName(dto.getMessName());
        mess.setMessAddress(dto.getMessAddress());
        mess.setMessType(dto.getMessType());
        mess.setLunchOpenTime(LocalTime.parse(dto.getLunchOpenTime()));
        mess.setLunchCloseTime(LocalTime.parse(dto.getLunchCloseTime()));
        mess.setDinnerOpenTime(LocalTime.parse(dto.getDinnerOpenTime()));
        mess.setDinnerCloseTime(LocalTime.parse(dto.getDinnerCloseTime()));

        return messRepo.save(mess);
    }

    // ---------------------------
    // Update Mess
    // ---------------------------
   
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


    // ---------------------------
    // Get all messes of a user
    // ---------------------------
    
    public List<Mess> getMessByUser(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messRepo.findByUserId(user);
    }

   
    public List<Mess> getAllMessesByUser(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messRepo.findAllByUserId(user);
    }

   
    public Mess getMessById(Integer messId) {
        return messRepo.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found"));
    }

   
    public void deleteMess(Integer messId) {
        Mess mess = messRepo.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found"));
        messRepo.delete(mess);
    }
}
