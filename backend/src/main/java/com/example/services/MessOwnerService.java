package com.example.services;



import java.util.List;

import com.example.dto.MessOwnerProfileDTO;
import com.example.dto.MessRequestDTO;
import com.example.entities.Mess;


public interface MessOwnerService {
	MessOwnerProfileDTO getMessOwnerProfile(int userId);
	 List<Mess> getMessByUser(Integer userId);

	Mess addMess(MessRequestDTO dto);
	Mess updateMess(MessRequestDTO dto);
//	Mess getMessByUser(Integer userId);
	List<Mess> getAllMessesByUser(Integer userId);

	// Get single mess by messId
	Mess getMessById(Integer messId);
	void deleteMess(Integer messId);

}
