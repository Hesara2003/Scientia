package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.ClassEntity;
import com.Sciencia.backend.services.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes")
public class ClassController {

    @Autowired
    private ClassService classService;

    @PostMapping
    public ResponseEntity<ClassEntity> createClass(@RequestBody ClassEntity newClass) {
        return ResponseEntity.ok(classService.createClass(newClass));
    }

    @GetMapping
    public ResponseEntity<List<ClassEntity>> getAllClasses() {
        return ResponseEntity.ok(classService.getAllClasses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassEntity> updateClass(@PathVariable Long id, @RequestBody ClassEntity updatedClass) {
        return classService.getClassById(id)
                .map(existingClass -> {
                    return ResponseEntity.ok(classService.createClass(updatedClass));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassEntity> getClassById(@PathVariable Long id) {
        return classService.getClassById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }
}