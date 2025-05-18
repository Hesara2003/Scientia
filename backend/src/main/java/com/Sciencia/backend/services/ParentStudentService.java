package com.Sciencia.backend.services;

import com.Sciencia.backend.model.ParentStudent;
import com.Sciencia.backend.repository.ParentStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentStudentService {

    @Autowired
    private ParentStudentRepository parentStudentRepository;

    public List<ParentStudent> getAllParentStudents() {
        return parentStudentRepository.findAll();
    }

    public ParentStudent getParentStudentById(Long id) {
        return parentStudentRepository.findById(id).orElse(null);
    }

    public ParentStudent addParentStudent(ParentStudent ps) {
        return parentStudentRepository.save(ps);
    }

    public void deleteParentStudent(Long id) {
        parentStudentRepository.deleteById(id);
    }
}
