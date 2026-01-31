package com.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "mess")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Mess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mess_id")
    private Integer messId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "mess_name", nullable = false)
    private String messName;

    @Column(name = "mess_address")
    private String messAddress;

    @Column(name = "mess_type")
    private String messType;   // Veg / Mixed / Non-Veg

    @Column(name = "lunch_open_time")
    private LocalTime lunchOpenTime;

    @Column(name = "lunch_close_time")
    private LocalTime lunchCloseTime;

    @Column(name = "dinner_open_time")
    private LocalTime dinnerOpenTime;

    @Column(name = "dinner_close_time")
    private LocalTime dinnerCloseTime;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area areaId;

    @JsonIgnore
    @OneToMany(mappedBy = "mess", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MealMenu> mealMenus;
}
