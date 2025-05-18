package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.ProgressReport;
import com.Sciencia.backend.services.ProgressReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor/progress-reports")
public class ProgressReportController {

    @Autowired
    private ProgressReportService progressReportService;

    @PostMapping
    public ProgressReport addReport(@RequestBody ProgressReport report) {
        return progressReportService.addProgressReport(report);
    }

    @GetMapping
    public List<ProgressReport> getAllReports() {
        return progressReportService.getAllProgressReports();
    }

    @GetMapping("/{id}")
    public ProgressReport getReportById(@PathVariable Long id) {
        return progressReportService.getProgressReportById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        progressReportService.deleteProgressReport(id);
    }
}
