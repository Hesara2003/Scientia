package com.Sciencia.backend.services;

import com.Sciencia.backend.model.RecordedLesson;
import com.Sciencia.backend.repository.RecordedLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordedLessonService {

    @Autowired
    private RecordedLessonRepository recordedLessonRepository;

    public List<RecordedLesson> getAllRecordedLessons() {
        return recordedLessonRepository.findAll();
    }

    public RecordedLesson getRecordedLessonById(Long id) {
        return recordedLessonRepository.findById(id).orElse(null);
    }

    public RecordedLesson addRecordedLesson(RecordedLesson recordedLesson) {
        return recordedLessonRepository.save(recordedLesson);
    }

    public void deleteRecordedLesson(Long id) {
        recordedLessonRepository.deleteById(id);
    }
}
