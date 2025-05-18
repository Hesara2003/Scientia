package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.ParentStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentStudentRepository extends JpaRepository<ParentStudent, Long> {
}

