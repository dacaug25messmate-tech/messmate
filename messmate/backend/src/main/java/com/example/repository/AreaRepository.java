package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Area;

public interface AreaRepository extends JpaRepository<Area, Integer> {
	List<Area> findByCityId_CityId(Integer cityId);
}
