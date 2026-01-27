package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.Mess;

public interface MessRepository extends JpaRepository<Mess, Integer> {

    // find mess owned by mess owner (user)
    Mess findByUserId_Userid(int userid);
}
