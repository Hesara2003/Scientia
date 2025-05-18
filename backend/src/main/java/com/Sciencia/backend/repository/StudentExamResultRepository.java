package com.Sciencia.backend.repository;

import com.Sciencia.backend.model.StudentExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentExamResultRepository extends JpaRepository<StudentExamResult, Long> {
}