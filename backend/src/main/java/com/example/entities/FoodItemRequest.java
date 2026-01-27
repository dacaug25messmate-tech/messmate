package com.example.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "food_item_request")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FoodItemRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="request_id")
    private int requestId;

    @Column(name="item_name")
    private String itemName;

    @Column(name="item_description")
    private String description;

    private String status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess messId;

    @ManyToOne
    @JoinColumn(name="sub_category_id")
    private SubCategory subCategory;
}
