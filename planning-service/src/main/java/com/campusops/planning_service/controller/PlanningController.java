package com.campusops.planning_service.controller;

import com.campusops.planning_service.dto.SlotFilterDTO;
import com.campusops.planning_service.dto.SlotRequestDTO;
import com.campusops.planning_service.dto.SlotResponseDTO;
import com.campusops.planning_service.service.SlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@RequiredArgsConstructor
public class PlanningController {

    private final SlotService slotService;

    @PostMapping
    public ResponseEntity<SlotResponseDTO> create(@Valid @RequestBody SlotRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(slotService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SlotResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody SlotRequestDTO request) {
        return ResponseEntity.ok(slotService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        slotService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SlotResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(slotService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<SlotResponseDTO>> findAll() {
        return ResponseEntity.ok(slotService.findAll());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<SlotResponseDTO>> filter(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart,
            @RequestParam(required = false) String etudiant,
            @RequestParam(required = false) String groupe,
            @RequestParam(required = false) String enseignant) {

        SlotFilterDTO filter = SlotFilterDTO.builder()
                .day(day)
                .weekStart(weekStart)
                .etudiant(etudiant)
                .groupe(groupe)
                .enseignant(enseignant)
                .build();

        return ResponseEntity.ok(slotService.filter(filter));
    }
}