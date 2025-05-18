package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.FeeReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeeReminderRepository extends JpaRepository<FeeReminder, Long> {
}
