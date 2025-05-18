package com.Sciencia.backend.services;

import com.Sciencia.backend.model.StudentExamResult;
import com.Sciencia.backend.repository.StudentExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentExamResultService {

    @Autowired
    private StudentExamResultRepository resultRepository;

    public StudentExamResult saveResult(StudentExamResult result) {
        return resultRepository.save(result);
    }

    public List<StudentExamResult> getResultsByExamId(Long examId) {
        return resultRepository.findAll(); // Add filtering logic if needed
    }
}