package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.RecordedLessonPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordedLessonPurchaseRepository extends JpaRepository<RecordedLessonPurchase, Long> {
}

