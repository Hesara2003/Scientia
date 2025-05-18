package com.Sciencia.backend.services;

import com.Sciencia.backend.model.Faq;
import com.Sciencia.backend.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    @Autowired
    private FaqRepository faqRepository;

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    public Faq getFaqById(Long id) {
        return faqRepository.findById(id).orElse(null);
    }

    public Faq addFaq(Faq faq) {
        return faqRepository.save(faq);
    }

    public void deleteFaq(Long id) {
        faqRepository.deleteById(id);
    }
}
