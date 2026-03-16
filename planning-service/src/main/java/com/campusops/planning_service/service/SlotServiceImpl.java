package com.campusops.planning_service.service;

import com.campusops.planning_service.dto.SlotFilterDTO;
import com.campusops.planning_service.dto.SlotRequestDTO;
import com.campusops.planning_service.dto.SlotResponseDTO;
import com.campusops.planning_service.exception.SlotNotFoundException;
import com.campusops.planning_service.model.Slot;
import com.campusops.planning_service.repository.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {

    private final SlotRepository slotRepository;

    @Override
    public SlotResponseDTO create(SlotRequestDTO request) {
        Slot slot = toEntity(request);
        return toResponse(slotRepository.save(slot));
    }

    @Override
    public SlotResponseDTO update(Long id, SlotRequestDTO request) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new SlotNotFoundException(id));
        slot.setDate(request.getDate());
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setModule(request.getModule());
        slot.setGroupe(request.getGroupe());
        slot.setEnseignant(request.getEnseignant());
        slot.setSalle(request.getSalle());
        return toResponse(slotRepository.save(slot));
    }

    @Override
    public void delete(Long id) {
        if (!slotRepository.existsById(id)) {
            throw new SlotNotFoundException(id);
        }
        slotRepository.deleteById(id);
    }

    @Override
    public SlotResponseDTO findById(Long id) {
        return slotRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new SlotNotFoundException(id));
    }

    @Override
    public List<SlotResponseDTO> findAll() {
        return slotRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<SlotResponseDTO> filter(SlotFilterDTO filter) {
        List<Slot> result;

        if (filter.getDay() != null) {
            result = slotRepository.findByDate(filter.getDay());
        } else if (filter.getWeekStart() != null) {
            LocalDate weekEnd = filter.getWeekStart().plusDays(6);
            if (filter.getGroupe() != null) {
                result = slotRepository.findByGroupeAndDateBetween(filter.getGroupe(), filter.getWeekStart(), weekEnd);
            } else if (filter.getEnseignant() != null) {
                result = slotRepository.findByEnseignantAndDateBetween(filter.getEnseignant(), filter.getWeekStart(), weekEnd);
            } else {
                result = slotRepository.findByDateBetween(filter.getWeekStart(), weekEnd);
            }
        } else if (filter.getGroupe() != null) {
            result = slotRepository.findByGroupe(filter.getGroupe());
        } else if (filter.getEnseignant() != null) {
            result = slotRepository.findByEnseignant(filter.getEnseignant());
        } else {
            result = slotRepository.findAll();
        }

        return result.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private Slot toEntity(SlotRequestDTO dto) {
        return Slot.builder()
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .module(dto.getModule())
                .groupe(dto.getGroupe())
                .enseignant(dto.getEnseignant())
                .salle(dto.getSalle())
                .build();
    }

    private SlotResponseDTO toResponse(Slot slot) {
        return SlotResponseDTO.builder()
                .id(slot.getId())
                .date(slot.getDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .module(slot.getModule())
                .groupe(slot.getGroupe())
                .enseignant(slot.getEnseignant())
                .salle(slot.getSalle())
                .build();
    }
}