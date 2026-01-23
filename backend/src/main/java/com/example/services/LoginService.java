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
    UserRepository urepo;
    
    public LoginResponse login(LoginRequest request) {
        User user = urepo.findByUserName(request.getUserName());

        LoginResponse response = new LoginResponse();

        if (user == null) {
            response.setStatus("USER_NOT_FOUND");
            return response;
        }

        if (user.getPassword().equals(request.getPassword())) {
            response.setStatus("SUCCESS");
            response.setUid(user.getUserid());
            response.setUname(user.getUserName());           
            response.setRole(user.getRoleId().getRoleName()); 
            return response;
        }

        response.setStatus("INVALID_PASSWORD");
        return response;
    }
}
