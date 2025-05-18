package com.Sciencia.backend.dto;

import com.Sciencia.backend.model.Attendance;
import com.Sciencia.backend.model.Attendance.AttendanceStatus;

import java.time.LocalDateTime;

public class AttendanceDTO {
    private Long attendanceId;
    private Long studentId;
    private Long classId;
    private AttendanceStatus status;
    private LocalDateTime date;

    public AttendanceDTO(Attendance attendance) {
        this.attendanceId = attendance.getAttendanceId();
        this.studentId = attendance.getStudent().getStudentId();
        this.classId = attendance.getClassEntity().getClassId();
        this.status = attendance.getStatus();
        this.date = attendance.getDate();
    }

    // Getters and Setters
    public Long getAttendanceId() { return attendanceId; }
    public void setAttendanceId(Long attendanceId) { this.attendanceId = attendanceId; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }
    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}