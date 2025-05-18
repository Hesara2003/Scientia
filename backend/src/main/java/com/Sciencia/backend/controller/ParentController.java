package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.Parent;
import com.Sciencia.backend.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parent/parents")
public class ParentController {

    @Autowired
    private ParentService parentService;

    @PostMapping
    public Parent addParent(@RequestBody Parent parent) {
        return parentService.addParent(parent);
    }

    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    @GetMapping("/{id}")
    public Parent getParentById(@PathVariable Long id) {
        return parentService.getParentById(id);
    }
    
    // New endpoint to handle username lookups
    @GetMapping("/username/{username}")
    public ResponseEntity<Parent> getParentByUsername(@PathVariable String username) {
        // In a real implementation, this would query a user table to find the parent by username
        // For now we'll just return a mock parent for "SamanthaP"
        if ("SamanthaP".equals(username)) {
            Parent parent = new Parent();
            parent.setId(101L); // Mock ID
            parent.setFirstName("Samantha");
            parent.setLastName("Parker");
            parent.setEmail("samantha.p@example.com");
            parent.setPhoneNumber("555-123-4567");
            return ResponseEntity.ok(parent);
        }
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void deleteParent(@PathVariable Long id) {
        parentService.deleteParent(id);
    }
}
