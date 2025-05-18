package com.Sciencia.backend.services;

import com.Sciencia.backend.model.RecordedLessonPurchase;
import com.Sciencia.backend.repository.RecordedLessonPurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordedLessonPurchaseService {

    @Autowired
    private RecordedLessonPurchaseRepository recordedLessonPurchaseRepository;

    public List<RecordedLessonPurchase> getAllRecordedLessonPurchases() {
        return recordedLessonPurchaseRepository.findAll();
    }

    public RecordedLessonPurchase getRecordedLessonPurchaseById(Long id) {
        return recordedLessonPurchaseRepository.findById(id).orElse(null);
    }

    public RecordedLessonPurchase addRecordedLessonPurchase(RecordedLessonPurchase purchase) {
        return recordedLessonPurchaseRepository.save(purchase);
    }

    public void deleteRecordedLessonPurchase(Long id) {
        recordedLessonPurchaseRepository.deleteById(id);
    }
}
