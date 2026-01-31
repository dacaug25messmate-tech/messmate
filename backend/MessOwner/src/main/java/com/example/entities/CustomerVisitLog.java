package com.example.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "customer_visit_log",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"subscription_id", "visit_date", "meal_type"}
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVisitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @Column(name = "visit_date")
    private LocalDate visitDate;

    @Column(name = "visit_status")
    private String visitStatus;   // true = visited

    @Column(name = "meal_type")
    private String mealType;       // LUNCH / DINNER
}
