package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.SubscriptionCustomer;
import com.example.repository.SubscriptionRepository;

@Service
public class SubscriptionService{

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public List<SubscriptionCustomer> getAllSubscribedCustomers(Long messId) {
        return subscriptionRepository.findAllCustomersByMessId(messId);
    }
}
