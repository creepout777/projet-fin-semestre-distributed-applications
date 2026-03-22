package com.campusops.planning_service.service;

import com.campusops.planning_service.dto.SlotDTO;
import com.campusops.planning_service.mapper.SlotMapper;
import com.campusops.planning_service.model.Recurrence;
import com.campusops.planning_service.model.Slot;
import com.campusops.planning_service.repository.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlotService {

    private final SlotRepository slotRepository;
    private final SlotMapper slotMapper;

    // ── READ ────────────────────────────────────────────────────────────────

    public List<SlotDTO> getByDateRange(LocalDate start, LocalDate end) {
        return slotRepository.findByDateBetween(start, end)
                .stream().map(slotMapper::toDTO).collect(Collectors.toList());
    }

    public List<SlotDTO> getByDate(LocalDate date) {
        return slotRepository.findByDate(date)
                .stream().map(slotMapper::toDTO).collect(Collectors.toList());
    }

    public List<SlotDTO> getByGroupe(String groupe, LocalDate start, LocalDate end) {
        return slotRepository.findByGroupeAndDateBetween(groupe, start, end)
                .stream().map(slotMapper::toDTO).collect(Collectors.toList());
    }

    public List<SlotDTO> getByEnseignant(String enseignant, LocalDate start, LocalDate end) {
        return slotRepository.findByEnseignantAndDateBetween(enseignant, start, end)
                .stream().map(slotMapper::toDTO).collect(Collectors.toList());
    }

    public SlotDTO getById(Long id) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
        return slotMapper.toDTO(slot);
    }

    // ── CREATE ──────────────────────────────────────────────────────────────

    @Transactional
    public List<SlotDTO> create(SlotDTO dto) {
        List<Slot> slotsToSave = new ArrayList<>();

        if (dto.getRecurrence() == Recurrence.WEEKLY) {
            // Generate slots for 12 weeks
            for (int i = 0; i < 12; i++) {
                Slot slot = slotMapper.toEntity(dto);
                slot.setDate(dto.getDate().plusWeeks(i));
                slotsToSave.add(slot);
            }
        } else {
            slotsToSave.add(slotMapper.toEntity(dto));
        }

        return slotRepository.saveAll(slotsToSave)
                .stream().map(slotMapper::toDTO).collect(Collectors.toList());
    }

    // ── UPDATE ──────────────────────────────────────────────────────────────

    @Transactional
    public SlotDTO update(Long id, SlotDTO dto) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
        slotMapper.updateEntity(slot, dto);
        return slotMapper.toDTO(slotRepository.save(slot));
    }

    // ── DELETE ──────────────────────────────────────────────────────────────

    @Transactional
    public void delete(Long id) {
        if (!slotRepository.existsById(id)) {
            throw new RuntimeException("Slot not found with id: " + id);
        }
        slotRepository.deleteById(id);
    }
}