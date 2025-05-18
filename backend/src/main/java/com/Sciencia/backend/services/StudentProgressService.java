package com.Sciencia.backend.services;

import com.Sciencia.backend.model.StudentProgress;
import com.Sciencia.backend.repository.StudentProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentProgressService {

    @Autowired
    private StudentProgressRepository studentProgressRepository;

    public List<StudentProgress> getAllStudentProgress() {
        return studentProgressRepository.findAll();
    }

    public StudentProgress getStudentProgressById(Long id) {
        return studentProgressRepository.findById(id).orElse(null);
    }

    public StudentProgress addStudentProgress(StudentProgress progress) {
        return studentProgressRepository.save(progress);
    }

    public void deleteStudentProgress(Long id) {
        studentProgressRepository.deleteById(id);
    }
}
