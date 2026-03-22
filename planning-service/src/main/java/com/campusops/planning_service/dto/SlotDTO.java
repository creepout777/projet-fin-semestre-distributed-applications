package com.campusops.planning_service.dto;

import com.campusops.planning_service.model.Recurrence;
import com.campusops.planning_service.model.SlotType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class SlotDTO {

    private Long id;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    @NotBlank(message = "Module is required")
    private String module;

    @NotBlank(message = "Groupe is required")
    private String groupe;

    @NotBlank(message = "Enseignant is required")
    private String enseignant;

    @NotBlank(message = "Salle is required")
    private String salle;

    @NotNull(message = "Type is required")
    private SlotType type;

    @NotNull(message = "Recurrence is required")
    private Recurrence recurrence;
}