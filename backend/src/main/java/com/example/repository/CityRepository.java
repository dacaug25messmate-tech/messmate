package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.City;

public interface CityRepository extends JpaRepository<City, Integer>{

}
