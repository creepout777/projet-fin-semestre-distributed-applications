package com.campusops.planning_service.repository;

import com.campusops.planning_service.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    // By date range (week view)
    List<Slot> findByDateBetween(LocalDate start, LocalDate end);

    // By groupe (etudiant view)
    List<Slot> findByGroupeAndDateBetween(String groupe, LocalDate start, LocalDate end);

    // By enseignant (teacher view)
    List<Slot> findByEnseignantAndDateBetween(String enseignant, LocalDate start, LocalDate end);

    // By single date (day view)
    List<Slot> findByDate(LocalDate date);

    // By groupe + date (day view for student)
    List<Slot> findByGroupeAndDate(String groupe, LocalDate date);
}