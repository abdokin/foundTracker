package com.foundtracker.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foundtracker.web.model.ApplicationStates;
import com.foundtracker.web.service.ApplicationStatesService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/states")
@RequiredArgsConstructor
@Tag(name = "States")
public class StatesController {
    final ApplicationStatesService aService;

    @GetMapping("/monthly-count")
    public ApplicationStates getMonthly() {

        return aService.getMonthly();
    }

}
