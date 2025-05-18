package com.Sciencia.backend.services;

import com.Sciencia.backend.model.TutePurchase;
import com.Sciencia.backend.repository.TutePurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutePurchaseService {

    @Autowired
    private TutePurchaseRepository tutePurchaseRepository;

    public List<TutePurchase> getAllTutePurchases() {
        return tutePurchaseRepository.findAll();
    }

    public TutePurchase getTutePurchaseById(Long id) {
        return tutePurchaseRepository.findById(id).orElse(null);
    }

    public TutePurchase addTutePurchase(TutePurchase purchase) {
        return tutePurchaseRepository.save(purchase);
    }

    public void deleteTutePurchase(Long id) {
        tutePurchaseRepository.deleteById(id);
    }
}
