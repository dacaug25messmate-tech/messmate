package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.LoginRequest;
import com.example.dto.LoginResponse;
import com.example.entities.User;
import com.example.repository.UserRepository;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {

        LoginResponse response = new LoginResponse();

        User user = userRepository.findByUserName(request.getUserName());

        if (user == null) {
            response.setStatus("USER_NOT_FOUND");
            return response;
        }

        if (!user.getPassword().equals(request.getPassword())) {
            response.setStatus("INVALID_PASSWORD");
            return response;
        }

        
        response.setStatus("SUCCESS");
        response.setUid(user.getUserid());         
        response.setUname(user.getUserName());
        response.setRole(user.getRoleId().getRoleName());

        
        if ("MESSOWNER".equalsIgnoreCase(user.getRoleId().getRoleName())) {
            response.setUserId(user.getUserid());
        }

        return response;
    }
}
