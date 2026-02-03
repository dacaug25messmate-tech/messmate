package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.entities.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

    @Query("""
        SELECT s FROM Subscription s
        WHERE s.plan.mess.messId = :messId
        AND s.status = 'ACTIVE'
    """)
    List<Subscription> findActiveSubscriptionsByMessId(@Param("messId") int messId);
    
    
    @Query("""
    	    SELECT COUNT(s) FROM Subscription s
    	    WHERE s.plan.planId = :planId
    	    AND s.status = 'ACTIVE'
    	""")
    	long countActiveSubscriptionsByPlanId(@Param("planId") int planId);
}
