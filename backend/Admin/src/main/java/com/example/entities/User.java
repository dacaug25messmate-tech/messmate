package com.example.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	Integer userid;
	
	@Column(name="user_name")
	String userName;
	
	String password;
	
	@Column(name="full_name")
	String fullName;
	
	String email;
	
	String phone;
	
	String address;
	
	@ManyToOne
	@JoinColumn(name="role_id")
	Role roleId;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	Question questionId;
	
	@Column(name="question_answer")
	String questionAnswer;
	
	@ManyToOne
	@JoinColumn(name="area_id")
	Area areaId;

	String status;
	
	@OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
	private List<Mess> messes;
	
	@Column(name="active_status")
	private String activeStatus;//Active/Inactive

}
