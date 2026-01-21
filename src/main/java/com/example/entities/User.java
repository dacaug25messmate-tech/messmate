package com.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int user_id;
	
	String user_name;
	
	String password;
	
	String full_name;
	
	String email;
	
	String phone;
	
	String address;
	
	@ManyToOne
	@JoinColumn(name="role_id")
	Role role_id;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	Question question_id;
	
	String question_answer;
	
	@ManyToOne
	@JoinColumn(name="area_id")
	Area area_id;
}
