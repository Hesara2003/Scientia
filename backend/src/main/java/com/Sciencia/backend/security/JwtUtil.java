package com.Sciencia.backend.security;

import com.Sciencia.backend.model.User;
import com.Sciencia.backend.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Keys.hmacShaKeyFor("YourSecretKeyYourSecretKeyYourSecretKey".getBytes()); // at least 256 bits
    private final long expirationMs = 86400000; // 1 day
    
    @Autowired
    private UserRepository userRepository;    public String generateToken(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        Map<String, Object> claims = new HashMap<>();
        // Store user role in token - ensure it's not null and uppercase
        String role = user.getRole();
        if (role == null || role.trim().isEmpty()) {
            role = "USER"; // Default role if not specified
        } else {
            // Normalize role to uppercase
            role = role.toUpperCase();
            // Handle tutor/teacher synonyms
            if (role.equals("TEACHER")) {
                role = "TUTOR";
            }
        }
        claims.put("role", role);
        
        // Log token generation for debugging
        System.out.println("Generating token for user: " + username + " with role: " + role);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("JWT token is missing or empty");
        }

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }    public String extractRole(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("JWT token is missing or empty");
        }

        try {
            String role = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);
            
            // Handle tutor/teacher role variation for backwards compatibility
            if (role != null && (role.equalsIgnoreCase("tutor") || role.equalsIgnoreCase("teacher"))) {
                // Normalize tutor/teacher roles for consistency
                return "TUTOR";
            }
            
            // Ensure role is not null, default to USER if missing
            return role != null ? role.toUpperCase() : "USER";
        } catch (Exception e) {
            // Log the error but return a default role to prevent null pointer exceptions
            System.err.println("Error extracting role from token: " + e.getMessage());
            return "USER";
        }
    }public boolean validateToken(String token) {
        try {
            if (token == null || token.trim().isEmpty()) {
                return false;
            }
            
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
            
            // Check if token is expired
            Date expiration = claims.getExpiration();
            if (expiration == null || expiration.before(new Date())) {
                return false;
            }
            
            // Check if subject/username exists
            String username = claims.getSubject();
            if (username == null || username.trim().isEmpty()) {
                return false;
            }
            
            // Additionally, verify that the user still exists in our database
            return userRepository.findByUsername(username).isPresent();
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }
}
