package com.Sciencia.backend.model;

import jakarta.persistence.*;


@Entity
@Table(name = "student_exam_results")
public class StudentExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "score", nullable = false)
    private Double score;

    // Getters and Setters

    public Long getResultId() {
        return resultId;
    }
    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }
    public Student getStudent() {
        return student;
    }
    public void setStudent(Student student) {
        this.student = student;
    }
    public Exam getExam() {
        return exam;
    }
    public void setExam(Exam exam) {
        this.exam = exam;
    }
    public Double getScore() {
        return score;
    }
    public void setScore(Double score) {
        this.score = score;
    }
}