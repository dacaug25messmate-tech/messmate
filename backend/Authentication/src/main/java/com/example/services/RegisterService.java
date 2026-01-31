package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.RegisterRequest;
import com.example.dto.RegisterResponse;
import com.example.entities.Area;
import com.example.entities.Question;
import com.example.entities.Role;
import com.example.entities.User;
import com.example.repository.AreaRepository;
import com.example.repository.QuestionRepository;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;

@Service
public class RegisterService {

	@Autowired
	UserRepository urepo;
	
	@Autowired
	private AreaRepository areaRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private QuestionRepository questionRepo;

	public RegisterResponse register(RegisterRequest request) {
		if (urepo.existsByUserName(request.getUserName())) {
	        RegisterResponse response = new RegisterResponse();
	        response.setStatus("FAILURE");
	        response.setMessage("Username '" + request.getUserName() + "' already exists.");
	        return response;
	    }

	    if (urepo.existsByEmail(request.getEmail())) {
	        RegisterResponse response = new RegisterResponse();
	        response.setStatus("FAILURE");
	        response.setMessage("Email '" + request.getEmail() + "' already exists.");
	        return response;
	    }
			Area area = areaRepo.findById(request.getAreaId()).orElseThrow(() -> new RuntimeException("Area not found"));

	        Role role = roleRepo.findById(request.getRoleId()).orElseThrow(() -> new RuntimeException("Role not found"));

	        Question question = questionRepo.findById(request.getQuestionId()).orElseThrow(() -> new RuntimeException("Question not found"));
	       
	        User user = new User();
	        user.setUserName(request.getUserName());
	        user.setPassword(request.getPassword());
	        user.setFullName(request.getFullName());
	        user.setEmail(request.getEmail());
	        user.setPhone(request.getPhone());
	        user.setAddress(request.getAddress());
	        user.setRoleId(role);
	        user.setQuestionId(question);
	        user.setQuestionAnswer(request.getQuestionAnswer());
	        user.setAreaId(area);
	        
	     // ROLE-BASED STATUS (SERVER ENFORCED)
	        if (role.getRoleName().equalsIgnoreCase("CUSTOMER")) {
	            user.setStatus("APPROVE");
	        } else if (role.getRoleName().equalsIgnoreCase("MESSOWNER")) {
	            user.setStatus("PENDING");
	        }
	        
	        urepo.save(user);

	        RegisterResponse response = new RegisterResponse();
	        response.setStatus("SUCCESS");
	        response.setMessage("User registered successfully.");
	        return response;
}
}
