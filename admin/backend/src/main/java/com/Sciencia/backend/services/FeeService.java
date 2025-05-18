package com.Sciencia.backend.services;

import com.Sciencia.backend.model.Fee;
import com.Sciencia.backend.repository.FeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    public List<Fee> getFeesByStudentId(Long studentId) {
        return feeRepository.findByStudentStudentId(studentId);
    }

    public Fee addFee(Fee fee) {
        return feeRepository.save(fee);
    }

    public void deleteFee(Long id) {
        feeRepository.deleteById(id);
    }

    public Fee getFeeById(Long id) {
        return feeRepository.findById(id).orElse(null);
    }

    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }




}
