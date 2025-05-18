package com.Sciencia.backend.services;

import com.Sciencia.backend.model.Tute;
import com.Sciencia.backend.repository.TuteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TuteService {

    @Autowired
    private TuteRepository tuteRepository;

    public List<Tute> getAllTutes() {
        return tuteRepository.findAll();
    }

    public Tute getTuteById(Long id) {
        return tuteRepository.findById(id).orElse(null);
    }

    public Tute addTute(Tute tute) {
        return tuteRepository.save(tute);
    }

    public void deleteTute(Long id) {
        tuteRepository.deleteById(id);
    }
}
