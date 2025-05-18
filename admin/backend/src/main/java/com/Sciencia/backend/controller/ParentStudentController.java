package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.ParentStudent;
import com.Sciencia.backend.services.ParentStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parent/parent-students")
public class ParentStudentController {

    @Autowired
    private ParentStudentService parentStudentService;

    @PostMapping
    public ParentStudent addRelation(@RequestBody ParentStudent parentStudent) {
        return parentStudentService.addParentStudent(parentStudent);
    }

    @GetMapping
    public List<ParentStudent> getAllRelations() {
        return parentStudentService.getAllParentStudents();
    }

    @GetMapping("/{id}")
    public ParentStudent getRelationById(@PathVariable Long id) {
        return parentStudentService.getParentStudentById(id);
    }
    
    @GetMapping("/parent/{parentId}")
    public List<ParentStudent> getRelationsByParentId(@PathVariable Long parentId) {
        List<ParentStudent> allRelations = parentStudentService.getAllParentStudents();
        return allRelations.stream()
                .filter(relation -> relation.getParent() != null && relation.getParent().getId().equals(parentId))
                .toList();
    }

    @DeleteMapping("/{id}")
    public void deleteRelation(@PathVariable Long id) {
        parentStudentService.deleteParentStudent(id);
    }
}
