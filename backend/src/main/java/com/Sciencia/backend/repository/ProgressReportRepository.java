package com.Sciencia.backend.repository;

import com.Sciencia.backend.model.ProgressReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressReportRepository extends JpaRepository<ProgressReport, Long> {
}
