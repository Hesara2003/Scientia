package com.Sciencia.backend.controller;

import com.Sciencia.backend.dto.AttendanceDTO;
import com.Sciencia.backend.model.Attendance;
import com.Sciencia.backend.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/attendance")
@RestController
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendanceRecords() {
        // Log current authentication and authorities
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String role = auth.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority())
                .orElse("ROLE_UNKNOWN");
                
        System.out.println("Current user: " + auth.getName() + " with authorities: " + auth.getAuthorities());
        
        List<AttendanceDTO> attendanceRecords = attendanceService.getAllAttendanceRecords().stream()
                .map(AttendanceDTO::new)
                .collect(Collectors.toList());
                
        System.out.println("Retrieved " + attendanceRecords.size() + " attendance records");
        
        return ResponseEntity.ok(attendanceRecords);
    }
    
    // Special endpoint that checks role from request param
    @GetMapping(params = "role")
    public ResponseEntity<List<AttendanceDTO>> getAllAttendanceRecordsByRole(
            @RequestParam(name = "role", required = false) String role,
            @RequestHeader(name = "X-User-Role", required = false) String headerRole) {
        
        // Use header role if provided, otherwise use param
        String effectiveRole = headerRole != null ? headerRole : role;
        System.out.println("Getting attendance with role param: " + effectiveRole);
        
        // For compatibility with frontend, accept various role formats
        if (effectiveRole != null) {
            effectiveRole = effectiveRole.toUpperCase();
            if (effectiveRole.equals("TUTOR") || effectiveRole.equals("TEACHER")) {
                // Special authorization for tutors
                List<AttendanceDTO> attendanceRecords = attendanceService.getAllAttendanceRecords().stream()
                        .map(AttendanceDTO::new)
                        .collect(Collectors.toList());
                
                System.out.println("Retrieved " + attendanceRecords.size() + " attendance records for TUTOR role");
                return ResponseEntity.ok(attendanceRecords);
            }
        }
        
        // Fall back to standard security check
        return getAllAttendanceRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDTO> getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id)
                .map(attendance -> ResponseEntity.ok(new AttendanceDTO(attendance)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AttendanceDTO> createAttendance(@RequestBody Attendance attendance) {
        return new ResponseEntity<>(
                new AttendanceDTO(attendanceService.createAttendance(attendance)),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDTO> updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        attendance.setAttendanceId(id);
        return ResponseEntity.ok(new AttendanceDTO(attendanceService.updateAttendance(attendance)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}