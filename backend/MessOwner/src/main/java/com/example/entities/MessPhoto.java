package com.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mess_photo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "mess_id", nullable = false)
    private Mess mess;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;
}
