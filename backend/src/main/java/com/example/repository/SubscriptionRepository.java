package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dto.SubscriptionCustomer;
import com.example.entities.UserSubscription;

public interface SubscriptionRepository 
        extends JpaRepository<UserSubscription, Long> {

    @Query("""
        SELECT new com.example.dto.SubscriptionCustomer(
            s.subscriptionId,
            u.userName,
            p.planName,
            p.mealInclusion,
            s.startDate,
            s.endDate,
            s.status
        )
        FROM UserSubscription s
        JOIN s.user u
        JOIN s.monthlyPlan p
        WHERE p.messId = :messId
    """)
    List<SubscriptionCustomer> findAllCustomersByMessId(
            @Param("messId") Long messId);
}
