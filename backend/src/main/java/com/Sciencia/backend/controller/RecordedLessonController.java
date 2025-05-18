package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.RecordedLesson;
import com.Sciencia.backend.services.RecordedLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor/recorded-lessons")
public class RecordedLessonController {

    @Autowired
    private RecordedLessonService recordedLessonService;

    @PostMapping
    public RecordedLesson addLesson(@RequestBody RecordedLesson lesson) {
        return recordedLessonService.addRecordedLesson(lesson);
    }

    @GetMapping
    public List<RecordedLesson> getAllLessons() {
        return recordedLessonService.getAllRecordedLessons();
    }

    @GetMapping("/{id}")
    public RecordedLesson getLessonById(@PathVariable Long id) {
        return recordedLessonService.getRecordedLessonById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable Long id) {
        recordedLessonService.deleteRecordedLesson(id);
    }
}
