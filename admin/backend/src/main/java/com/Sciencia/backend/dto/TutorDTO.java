package com.Sciencia.backend.dto;

import com.Sciencia.backend.model.Tutor;

public class TutorDTO {
    private Long tutorId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String bio;

    public TutorDTO(Tutor tutor) {
        this.tutorId = tutor.getTutorId();
        this.firstName = tutor.getFirstName();
        this.lastName = tutor.getLastName();
        this.email = tutor.getEmail();
        this.phoneNumber = tutor.getPhoneNumber();
        this.bio = tutor.getBio();
    }

    // Getters and Setters
    public void setTutorId(Long tutorId) { this.tutorId = tutorId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
