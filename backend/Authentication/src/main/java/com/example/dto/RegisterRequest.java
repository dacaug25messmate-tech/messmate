package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RegisterRequest {

	public String userName;
	
	String password;
	
	String fullName;
	
	String email;
	
	String phone;
	
	String address;
	
	int roleId;
	
	int questionId;
	
	String questionAnswer;
	
	int areaId;
	
	int cityId;
	
	private String status;
}
