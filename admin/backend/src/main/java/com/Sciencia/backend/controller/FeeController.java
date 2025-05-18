package com.Sciencia.backend.controller;

import com.Sciencia.backend.dto.FeeDTO;
import com.Sciencia.backend.model.Fee;
import com.Sciencia.backend.services.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fees")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @GetMapping
    public ResponseEntity<List<FeeDTO>> getAllFees() {
        System.out.println("Fetching all fees");
        List<FeeDTO> fees = feeService.getAllFees().stream()
                .map(FeeDTO::new)
                .collect(Collectors.toList());
        System.out.println("Returning " + fees.size() + " fees");
        return ResponseEntity.ok(fees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeeDTO> getFeeById(@PathVariable Long id) {
        System.out.println("Fetching fee with ID: " + id);
        try {
            Fee fee = feeService.getFeeById(id);
            return ResponseEntity.ok(new FeeDTO(fee));
        } catch (IllegalArgumentException e) {
            System.err.println("Fee not found: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Fee>> getFeesByStudentId(@PathVariable Long studentId) {
        System.out.println("Fetching fees for student ID: " + studentId);
        List<Fee> fees = feeService.getFeesByStudentId(studentId);
        System.out.println("Returning " + fees.size() + " fees for student");
        return ResponseEntity.ok(fees);
    }

    @PostMapping
    public ResponseEntity<Fee> createFee(@RequestBody Fee fee) {
        System.out.println("Creating fee: " + fee);
        try {
            Fee createdFee = feeService.addFee(fee);
            return ResponseEntity.ok(createdFee);
        } catch (Exception e) {
            System.err.println("Error creating fee: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fee> updateFee(@PathVariable Long id, @RequestBody Fee fee) {
        System.out.println("Updating fee ID: " + id);
        fee.setFeeId(id);
        try {
            Fee updatedFee = feeService.addFee(fee);
            return ResponseEntity.ok(updatedFee);
        } catch (Exception e) {
            System.err.println("Error updating fee: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFee(@PathVariable Long id) {
        System.out.println("Deleting fee ID: " + id);
        try {
            feeService.deleteFee(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            System.err.println("Fee not found: " + id);
            return ResponseEntity.notFound().build();
        }
    }
}