package com.campusops.planning_service.controller;

import com.campusops.planning_service.dto.SlotDTO;
import com.campusops.planning_service.service.SlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/planning/slots")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SlotController {

    private final SlotService slotService;

    // ── READ (all authenticated roles) ──────────────────────────────────────

    @GetMapping("/range")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE','ENSEIGNANT','ETUDIANT')")
    public ResponseEntity<List<SlotDTO>> getByRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(slotService.getByDateRange(start, end));
    }

    @GetMapping("/date")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE','ENSEIGNANT','ETUDIANT')")
    public ResponseEntity<List<SlotDTO>> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(slotService.getByDate(date));
    }

    @GetMapping("/groupe/{groupe}")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE','ENSEIGNANT','ETUDIANT')")
    public ResponseEntity<List<SlotDTO>> getByGroupe(
            @PathVariable String groupe,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(slotService.getByGroupe(groupe, start, end));
    }

    @GetMapping("/enseignant/{enseignant}")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE','ENSEIGNANT','ETUDIANT')")
    public ResponseEntity<List<SlotDTO>> getByEnseignant(
            @PathVariable String enseignant,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(slotService.getByEnseignant(enseignant, start, end));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE','ENSEIGNANT','ETUDIANT')")
    public ResponseEntity<SlotDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(slotService.getById(id));
    }

    // ── WRITE (ADMIN + SCOLARITE only) ───────────────────────────────────────

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE')")
    public ResponseEntity<List<SlotDTO>> create(@Valid @RequestBody SlotDTO dto) {
        return ResponseEntity.ok(slotService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE')")
    public ResponseEntity<SlotDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody SlotDTO dto) {
        return ResponseEntity.ok(slotService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SCOLARITE')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        slotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}