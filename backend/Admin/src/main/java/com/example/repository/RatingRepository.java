package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.dto.AdminFeedback;
import com.example.dto.MessOwnerRatingDTO;
import com.example.entities.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

   
    @Query("""
        SELECT new com.example.dto.AdminFeedback(
            r.ratingId,
            m.messName,
            m.messAddress,
            u.userName,
            r.rating,
            r.comments
        )
        FROM Rating r
        JOIN r.mess m
        JOIN r.user u
    """)
    List<AdminFeedback> getAllFeedbackForAdmin();


    
    List<Rating> findByMess_MessId(int messId);
    
    @Query("""
    	    SELECT new com.example.dto.MessOwnerRatingDTO(
    	        r.ratingId,
    	        m.messId,
    	        m.messName,
    	        u.userName,
    	        r.rating,
    	        r.comments
    	    )
    	    FROM Rating r
    	    JOIN r.mess m
    	    JOIN m.userId owner
    	    JOIN r.user u
    	    WHERE owner.userid = :userId
    	    ORDER BY m.messName
    	""")
    	List<MessOwnerRatingDTO> findAllRatingsByMessOwner(@Param("userId") Integer userId);

}
