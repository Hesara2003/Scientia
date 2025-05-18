package com.Sciencia.backend.services;

import com.Sciencia.backend.model.ClassEntity;
import com.Sciencia.backend.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public ClassEntity createClass(ClassEntity newClass) {
        return classRepository.save(newClass);
    }

    public List<ClassEntity> getAllClasses() {
        return classRepository.findAll();
    }

    public Optional<ClassEntity> getClassById(Long id) {
        return classRepository.findById(id);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}