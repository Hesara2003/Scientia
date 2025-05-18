package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.StudentProgress;
import com.Sciencia.backend.services.StudentProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/progress")
public class StudentProgressController {

    @Autowired
    private StudentProgressService studentProgressService;

    @PostMapping
    public StudentProgress addProgress(@RequestBody StudentProgress progress) {
        return studentProgressService.addStudentProgress(progress);
    }

    @GetMapping
    public List<StudentProgress> getAllProgress() {
        return studentProgressService.getAllStudentProgress();
    }

    @GetMapping("/{id}")
    public StudentProgress getProgressById(@PathVariable Long id) {
        return studentProgressService.getStudentProgressById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable Long id) {
        studentProgressService.deleteStudentProgress(id);
    }
}
