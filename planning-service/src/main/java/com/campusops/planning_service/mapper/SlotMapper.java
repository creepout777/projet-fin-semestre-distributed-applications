package com.campusops.planning_service.mapper;

import com.campusops.planning_service.dto.SlotDTO;
import com.campusops.planning_service.model.Slot;
import org.springframework.stereotype.Component;

@Component
public class SlotMapper {

    public SlotDTO toDTO(Slot slot) {
        return SlotDTO.builder()
                .id(slot.getId())
                .date(slot.getDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .module(slot.getModule())
                .groupe(slot.getGroupe())
                .enseignant(slot.getEnseignant())
                .salle(slot.getSalle())
                .type(slot.getType())
                .recurrence(slot.getRecurrence())
                .build();
    }

    public Slot toEntity(SlotDTO dto) {
        return Slot.builder()
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .module(dto.getModule())
                .groupe(dto.getGroupe())
                .enseignant(dto.getEnseignant())
                .salle(dto.getSalle())
                .type(dto.getType())
                .recurrence(dto.getRecurrence())
                .build();
    }

    public void updateEntity(Slot slot, SlotDTO dto) {
        slot.setDate(dto.getDate());
        slot.setStartTime(dto.getStartTime());
        slot.setEndTime(dto.getEndTime());
        slot.setModule(dto.getModule());
        slot.setGroupe(dto.getGroupe());
        slot.setEnseignant(dto.getEnseignant());
        slot.setSalle(dto.getSalle());
        slot.setType(dto.getType());
        slot.setRecurrence(dto.getRecurrence());
    }
}