package com.Sciencia.backend.controller;

import com.Sciencia.backend.dto.TutorDTO;
import com.Sciencia.backend.model.Tutor;
import com.Sciencia.backend.services.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// TutorController.java
@RestController
@RequestMapping("/tutors")
public class TutorController {
    @Autowired
    private TutorService tutorService;

    @GetMapping
    public List<TutorDTO> getAllTutors() {
        return tutorService.getAllTutors().stream()
                .map(TutorDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TutorDTO> getTutorById(@PathVariable Long id) {
        return tutorService.getTutorById(id)
                .map(tutor -> ResponseEntity.ok(new TutorDTO(tutor)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TutorDTO> createTutor(@RequestBody Tutor tutor) {
        return new ResponseEntity<>(
                new TutorDTO(tutorService.createTutor(tutor)),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TutorDTO> updateTutor(@PathVariable Long id, @RequestBody Tutor tutor) {
        tutor.setTutorId(id);
        return ResponseEntity.ok(new TutorDTO(tutorService.updateTutor(tutor)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Long id) {
        tutorService.deleteTutor(id);
        return ResponseEntity.noContent().build();
    }
}