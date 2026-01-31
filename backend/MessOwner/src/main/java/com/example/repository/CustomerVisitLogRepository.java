package com.example.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.CustomerVisitLog;

public interface CustomerVisitLogRepository
        extends JpaRepository<CustomerVisitLog, Integer> {

    
    
    Optional<CustomerVisitLog>
    findBySubscription_SubscriptionIdAndVisitDateAndMealType(
        int subscriptionId,
        LocalDate visitDate,
        String mealType
    );
}
