package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Subscription;
import com.example.repository.SubscriptionRepository;

@Service
public class MessOwnerService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public List<Subscription> getRegisteredCustomers(int messId) {
        return subscriptionRepository.findActiveSubscriptionsByMessId(messId);
    }
}
