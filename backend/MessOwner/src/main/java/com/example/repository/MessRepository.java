package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entities.Mess;
import com.example.entities.User;

@Repository
public interface MessRepository extends JpaRepository<Mess, Integer> {

    //  Find messes by User entity
    List<Mess> findByUserId(User user);

    //  Find messes by userId (Integer)
    @Query("SELECT m FROM Mess m WHERE m.userId.userid = :userId")
    List<Mess> findByUserIdInt(@Param("userId") Integer userId);

    // Optional: find all by User entity
    List<Mess> findAllByUserId(User user);
    
    List<Mess> findByUserId_Userid(int userId);
}
