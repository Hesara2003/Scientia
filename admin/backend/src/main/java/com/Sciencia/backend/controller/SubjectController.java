package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.Subject;
import com.Sciencia.backend.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public Subject getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        return subjectService.updateSubject(id, subject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
    }

    @GetMapping("/{id}/timetable")
    public List<String> getSubjectTimetable(@PathVariable Long id) {
        return subjectService.getTimetable(id);
    }

    @GetMapping("/{id}/recordings")
    public List<String> getSubjectRecordings(@PathVariable Long id) {
        return subjectService.getRecordings(id);
    }

    @GetMapping("/{id}/tutors")
    public List<String> getSubjectTutors(@PathVariable Long id) {
        return subjectService.getTutors(id);
    }
}
