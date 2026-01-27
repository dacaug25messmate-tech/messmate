package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.Mess;

@Repository
public interface MessRepository extends JpaRepository<Mess, Integer> {
    List<Mess> findByUserId(Integer userId);
}
