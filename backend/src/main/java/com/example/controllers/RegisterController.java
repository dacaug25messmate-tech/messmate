package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.RegisterRequest;
import com.example.dto.RegisterResponse;
import com.example.services.RegisterService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {

	@Autowired
	RegisterService rservice;
	
	@PostMapping("/register")
	public RegisterResponse register(@RequestBody RegisterRequest request) {
		return rservice.register(request);
	}
}
