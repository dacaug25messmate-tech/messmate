package com.example.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "meal_menu")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MealMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Integer menuId;

     
    @ManyToOne
    @JoinColumn(name = "mess_id", nullable = false)
    private Mess mess;

    @Column(name = "menu_date")
    private LocalDate menuDate;

    @Column(name = "menu_type", nullable = false)
    private String menuType;

    @OneToMany(mappedBy = "mealMenu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MealMenuFoodItem> foodItems;

    

}
