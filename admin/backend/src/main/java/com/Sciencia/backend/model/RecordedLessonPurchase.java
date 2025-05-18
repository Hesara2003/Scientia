package com.Sciencia.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recorded_lesson_purchases")
public class RecordedLessonPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "recorded_lesson_id")
    private RecordedLesson recordedLesson;

    private LocalDateTime purchaseDate;

    public RecordedLessonPurchase() {}

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

    public RecordedLesson getRecordedLesson() {
        return recordedLesson;
    }

    public void setRecordedLesson(RecordedLesson recordedLesson) {
        this.recordedLesson = recordedLesson;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
