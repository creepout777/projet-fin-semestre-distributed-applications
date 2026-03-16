package com.campusops.planning_service.exception;

public class SlotNotFoundException extends RuntimeException {

    public SlotNotFoundException(Long id) {
        super("Slot not found with id: " + id);
    }
}