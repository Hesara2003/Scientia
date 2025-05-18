package com.Sciencia.backend.services;

import com.Sciencia.backend.model.ExamQuestion;
import com.Sciencia.backend.repository.ExamQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamQuestionService {

    @Autowired
    private ExamQuestionRepository examQuestionRepository;

    public ExamQuestion createQuestion(ExamQuestion question) {
        return examQuestionRepository.save(question);
    }

    public List<ExamQuestion> getQuestionsByExamId(Long examId) {
        return examQuestionRepository.findAll(); // Add filtering logic if needed
    }
}