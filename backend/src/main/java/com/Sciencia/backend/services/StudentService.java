package com.Sciencia.backend.services;

import com.Sciencia.backend.model.Student;
import com.Sciencia.backend.repository.FeeRepository;
import com.Sciencia.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FeeRepository feeRepository;

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Student not found with id: " + id);
        }
        // Delete associated fees
        feeRepository.deleteByStudentStudentId(id);
        // Delete the student
        studentRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return studentRepository.existsById(id);
    }

    public Student updateStudent(Student student) {
        if (!studentRepository.existsById(student.getStudentId())) {
            throw new EntityNotFoundException("Student not found with id: " + student.getStudentId());
        }
        return studentRepository.save(student);
    }
}