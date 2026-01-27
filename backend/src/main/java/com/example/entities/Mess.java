package com.example.entities;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;  

    @Column(name = "mess_name")
    private String messName;

    @Column(name = "mess_address")
    private String messAddress;

    @Column(name = "mess_type")
    private String messType;

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
}
