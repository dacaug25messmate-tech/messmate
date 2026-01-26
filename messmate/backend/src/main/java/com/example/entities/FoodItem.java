package com.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "food_item")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="food_item_id")
    private Integer foodItemId;

    @Column(name="food_name")
    private String foodName;
    
    @Column(name="description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

}