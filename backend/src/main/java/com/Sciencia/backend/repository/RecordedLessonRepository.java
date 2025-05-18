package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.RecordedLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordedLessonRepository extends JpaRepository<RecordedLesson, Long> {
}
