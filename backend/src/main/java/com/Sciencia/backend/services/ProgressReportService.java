package com.Sciencia.backend.services;

import com.Sciencia.backend.model.ProgressReport;
import com.Sciencia.backend.repository.ProgressReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressReportService {

    @Autowired
    private ProgressReportRepository progressReportRepository;

    public List<ProgressReport> getAllProgressReports() {
        return progressReportRepository.findAll();
    }

    public ProgressReport getProgressReportById(Long id) {
        return progressReportRepository.findById(id).orElse(null);
    }

    public ProgressReport addProgressReport(ProgressReport report) {
        return progressReportRepository.save(report);
    }

    public void deleteProgressReport(Long id) {
        progressReportRepository.deleteById(id);
    }
}
