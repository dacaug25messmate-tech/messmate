package com.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mealmenu_fooditem")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MealMenuFoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mealmenu_fooditem_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    @JsonIgnore
    private MealMenu mealMenu;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private FoodItem foodItem;
}
