package com.Sciencia.backend.dto;

import com.Sciencia.backend.model.Fee;
import java.math.BigDecimal;
import java.time.LocalDate;

public class FeeDTO {
    private Long feeId;
    private Long studentId;
    private String studentName;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
    private String category;
    private LocalDate paymentDate;

    // Constructor to convert from Fee entity
    public FeeDTO(Fee fee) {
        this.feeId = fee.getFeeId();
        if (fee.getStudent() != null) {
            this.studentId = fee.getStudent().getStudentId();
            this.studentName = fee.getStudent().getFirstName() + " " + fee.getStudent().getLastName();
        }
        this.amount = fee.getAmount();
        this.dueDate = fee.getDueDate();
        this.status = fee.getStatus() != null ? fee.getStatus().toString() : "Pending";
    }

    // Getters and setters
    public Long getFeeId() { return feeId; }
    public void setFeeId(Long feeId) { this.feeId = feeId; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

}