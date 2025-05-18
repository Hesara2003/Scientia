package com.Sciencia.backend.repository;

import com.Sciencia.backend.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudentStudentId(Long studentId);
    void deleteByStudentStudentId(Long studentId);
}