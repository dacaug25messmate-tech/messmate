package com.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sub_category")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sub_category_id")
    Integer subCategoryId;

    @Column(name="sub_category_name")
    String subCategoryName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category categoryId;

}