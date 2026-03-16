package com.campusops.planning_service.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SlotFilterDTO {

    private LocalDate day;

    private LocalDate weekStart;

    private String etudiant;

    private String groupe;

    private String enseignant;
}