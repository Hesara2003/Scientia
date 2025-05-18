package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.FeeReminder;
import com.Sciencia.backend.services.FeeReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor/fee-reminders")
public class FeeReminderController {

    @Autowired
    private FeeReminderService feeReminderService;

    @PostMapping
    public FeeReminder addReminder(@RequestBody FeeReminder reminder) {
        return feeReminderService.addFeeReminder(reminder);
    }

    // Add this method to FeeReminderController.java
    @PutMapping("/{id}")
    public FeeReminder updateReminder(@PathVariable Long id, @RequestBody FeeReminder reminder) {
        reminder.setId(id);
        return feeReminderService.updateFeeReminder(reminder);
    }

    @GetMapping
    public List<FeeReminder> getAllReminders() {
        return feeReminderService.getAllFeeReminders();
    }

    @GetMapping("/{id}")
    public FeeReminder getReminderById(@PathVariable Long id) {
        return feeReminderService.getFeeReminderById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable Long id) {
        feeReminderService.deleteFeeReminder(id);
    }
}
