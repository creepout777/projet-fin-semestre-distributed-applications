package com.campusops.planning_service.repository;

import com.campusops.planning_service.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByDate(LocalDate date);

    List<Slot> findByDateBetween(LocalDate start, LocalDate end);

    List<Slot> findByGroupe(String groupe);

    List<Slot> findByEnseignant(String enseignant);

    List<Slot> findByGroupeAndDateBetween(String groupe, LocalDate start, LocalDate end);

    List<Slot> findByEnseignantAndDateBetween(String enseignant, LocalDate start, LocalDate end);
}