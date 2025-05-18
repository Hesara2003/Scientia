package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.RecordedLessonPurchase;
import com.Sciencia.backend.services.RecordedLessonPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/lesson-purchases")
public class RecordedLessonPurchaseController {

    @Autowired
    private RecordedLessonPurchaseService lessonPurchaseService;

    @PostMapping
    public RecordedLessonPurchase purchaseLesson(@RequestBody RecordedLessonPurchase purchase) {
        return lessonPurchaseService.addRecordedLessonPurchase(purchase);
    }

    @GetMapping
    public List<RecordedLessonPurchase> getAllPurchases() {
        return lessonPurchaseService.getAllRecordedLessonPurchases();
    }

    @GetMapping("/{id}")
    public RecordedLessonPurchase getPurchaseById(@PathVariable Long id) {
        return lessonPurchaseService.getRecordedLessonPurchaseById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePurchase(@PathVariable Long id) {
        lessonPurchaseService.deleteRecordedLessonPurchase(id);
    }
}
