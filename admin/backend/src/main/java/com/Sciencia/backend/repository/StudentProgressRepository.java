package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {
}
