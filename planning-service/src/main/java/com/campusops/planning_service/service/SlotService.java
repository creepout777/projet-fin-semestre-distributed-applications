package com.campusops.planning_service.service;

import com.campusops.planning_service.dto.SlotFilterDTO;
import com.campusops.planning_service.dto.SlotRequestDTO;
import com.campusops.planning_service.dto.SlotResponseDTO;

import java.util.List;

public interface SlotService {

    SlotResponseDTO create(SlotRequestDTO request);

    SlotResponseDTO update(Long id, SlotRequestDTO request);

    void delete(Long id);

    SlotResponseDTO findById(Long id);

    List<SlotResponseDTO> findAll();

    List<SlotResponseDTO> filter(SlotFilterDTO filter);
}