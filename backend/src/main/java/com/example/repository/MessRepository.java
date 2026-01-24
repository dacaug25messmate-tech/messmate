package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.Mess;

public interface MessRepository extends JpaRepository<Mess, Integer> {
	Optional<Mess> findByUserIdUserid(int userid);
}
