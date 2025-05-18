package com.Sciencia.backend.services;

import com.Sciencia.backend.model.Subject;
import com.Sciencia.backend.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    public Subject updateSubject(Long id, Subject subject) {
        subject.setId(id);
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    // Dummy data for recordings and timetable (to be replaced with real logic)
    public List<String> getTimetable(Long subjectId) {
        return List.of("Monday 10:00 AM", "Wednesday 2:00 PM");
    }

    public List<String> getRecordings(Long subjectId) {
        return List.of("Introduction.mp4", "Chapter1.mp4");
    }

    public List<String> getTutors(Long subjectId) {
        return List.of("Dr. Silva", "Ms. Perera");
    }
}
