package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.TutePurchase;
import com.Sciencia.backend.services.TutePurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/tute-purchases")
public class TutePurchaseController {

    @Autowired
    private TutePurchaseService tutePurchaseService;

    @PostMapping
    public TutePurchase purchaseTute(@RequestBody TutePurchase purchase) {
        return tutePurchaseService.addTutePurchase(purchase);
    }

    @GetMapping
    public List<TutePurchase> getAllPurchases() {
        return tutePurchaseService.getAllTutePurchases();
    }

    @GetMapping("/{id}")
    public TutePurchase getPurchaseById(@PathVariable Long id) {
        return tutePurchaseService.getTutePurchaseById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePurchase(@PathVariable Long id) {
        tutePurchaseService.deleteTutePurchase(id);
    }
}
