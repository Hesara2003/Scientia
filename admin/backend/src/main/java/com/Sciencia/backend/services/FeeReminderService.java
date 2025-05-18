package com.Sciencia.backend.services;

import com.Sciencia.backend.model.FeeReminder;
import com.Sciencia.backend.repository.FeeReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeReminderService {

    @Autowired
    private FeeReminderRepository feeReminderRepository;

    public List<FeeReminder> getAllFeeReminders() {
        return feeReminderRepository.findAll();
    }

    public FeeReminder getFeeReminderById(Long id) {
        return feeReminderRepository.findById(id).orElse(null);
    }

    public FeeReminder addFeeReminder(FeeReminder reminder) {
        return feeReminderRepository.save(reminder);
    }

    public void deleteFeeReminder(Long id) {
        feeReminderRepository.deleteById(id);
    }

    public FeeReminder updateFeeReminder(FeeReminder reminder) {
        return reminder;
    }
}
