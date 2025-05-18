package com.Sciencia.backend.controller;

import com.Sciencia.backend.model.User;
import com.Sciencia.backend.repository.UserRepository;
import com.Sciencia.backend.security.JwtUtil;
import com.Sciencia.backend.security.CustomUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            logger.warn("Invalid login request: username or password missing");
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
        }

        try {
            logger.debug("Attempting authentication for username: {}", user.getUsername());
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtUtil.generateToken(userDetails.getUsername());
            logger.info("Generated JWT token for username: {}", user.getUsername());

            User userData = userRepo.findByUsername(user.getUsername()).orElseThrow();
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", userData.getRole());
            response.put("username", userData.getUsername());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            logger.warn("Authentication failed for username: {} - Invalid credentials", user.getUsername());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        } catch (DisabledException e) {
            logger.warn("Authentication failed for username: {} - Account disabled", user.getUsername());
            return ResponseEntity.status(401).body(Map.of("error", "Account is disabled"));
        } catch (LockedException e) {
            logger.warn("Authentication failed for username: {} - Account locked", user.getUsername());
            return ResponseEntity.status(401).body(Map.of("error", "Account is locked"));
        } catch (Exception e) {
            logger.error("Unexpected error during login for username: {}", user.getUsername(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            logger.warn("Invalid registration request: username or password missing");
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
        }

        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            logger.warn("Registration failed: Username {} already exists", user.getUsername());
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }

        try {
            logger.debug("Registering new user: {}", user.getUsername());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            logger.info("User registered successfully: {}", user.getUsername());
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            logger.error("Error registering user: {}", user.getUsername(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to register user"));
        }
    }
}