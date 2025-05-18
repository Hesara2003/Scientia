package com.Sciencia.backend.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_progress")
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private LocalDateTime progressDate;

    @Column(columnDefinition = "TEXT")
    private String progressDetails;

    public StudentProgress() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public LocalDateTime getProgressDate() {
        return progressDate;
    }

    public void setProgressDate(LocalDateTime progressDate) {
        this.progressDate = progressDate;
    }

    public String getProgressDetails() {
        return progressDetails;
    }

    public void setProgressDetails(String progressDetails) {
        this.progressDetails = progressDetails;
    }
}
