package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.Tute;
import com.Sciencia.backend.services.TuteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor/tutes")
public class TuteController {

    @Autowired
    private TuteService tuteService;

    @PostMapping
    public Tute addTute(@RequestBody Tute tute) {
        return tuteService.addTute(tute);
    }

    @GetMapping
    public List<Tute> getAllTutes() {
        return tuteService.getAllTutes();
    }

    @GetMapping("/{id}")
    public Tute getTuteById(@PathVariable Long id) {
        return tuteService.getTuteById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTute(@PathVariable Long id) {
        tuteService.deleteTute(id);
    }
}
