package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.Faq;
import com.Sciencia.backend.services.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/faqs")
public class FaqController {

    @Autowired
    private FaqService faqService;

    @PostMapping
    public Faq addFaq(@RequestBody Faq faq) {
        return faqService.addFaq(faq);
    }

    @GetMapping
    public List<Faq> getAllFaqs() {
        return faqService.getAllFaqs();
    }

    @GetMapping("/{id}")
    public Faq getFaqById(@PathVariable Long id) {
        return faqService.getFaqById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
    }
}
