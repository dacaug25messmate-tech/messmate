//package com.example.repository;
//
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.example.entities.Mess;
//
//public interface MessRepository extends JpaRepository<Mess, Integer> {
//	Optional<Mess> findByUserIdUserid(int userid);
//}
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.Mess;
import com.example.entities.User;
import java.util.List;

public interface MessRepository extends JpaRepository<Mess, Integer> {
	List<Mess> findByUserId(User user);
	 void deleteByMessId(Integer messId);
	// Optional: find a single mess by name for uniqueness checks
	Mess findByUserIdAndMessName(User user, String messName); // Current mess of a user
    List<Mess> findAllByUserId(User user); // For multiple messes if needed
}
