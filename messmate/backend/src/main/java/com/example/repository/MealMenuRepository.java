package com.example.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.MealMenu;

@Repository
public interface MealMenuRepository extends JpaRepository<MealMenu, Integer> {

    List<MealMenu> findByMess_MessId(Integer messId);

    List<MealMenu> findByMess_MessIdAndMenuDate(Integer messId, LocalDate menuDate);

    Optional<MealMenu> findByMess_MessIdAndMenuDateAndMenuType(
            Integer messId,
            LocalDate menuDate,
            String menuType
    );
}
