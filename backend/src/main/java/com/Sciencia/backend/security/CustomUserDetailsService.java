package com.Sciencia.backend.security;

import com.Sciencia.backend.model.User;
import com.Sciencia.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // Get the role and handle tutor/teacher variations
        String role = user.getRole() != null ? user.getRole().toUpperCase() : "USER";
        
        // Normalize tutor/teacher roles
        if (role.equalsIgnoreCase("TUTOR") || role.equalsIgnoreCase("TEACHER")) {
            role = "ROLE_TUTOR";
        } else if (!role.startsWith("ROLE_")) {
            // Convert role to Spring Security format (ROLE_XXX)
            role = "ROLE_" + role;
        }
        
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
        
        // Add more debug info
        System.out.println("Loading user: " + username + " with role: " + role);
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
}
