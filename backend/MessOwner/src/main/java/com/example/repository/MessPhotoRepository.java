package com.example.repository;

import com.example.entities.MessPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessPhotoRepository extends JpaRepository<MessPhoto, Integer> {

    List<MessPhoto> findByMess_MessId(Integer messId);
}
