package com.Sciencia.backend.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        // Get X-User-Role header if present
        String userRoleHeader = request.getHeader("X-User-Role");
        
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String username = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);
                
                // Log current auth attempt details
                logger.info("Auth attempt - Username: " + username + ", Role from token: " + role + 
                           ", Role from header: " + userRoleHeader);
                
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    
                    // Check if we have a role header and we should override the token role
                    if (userRoleHeader != null && !userRoleHeader.isEmpty()) {
                        logger.info("Using role from header: " + userRoleHeader);
                        // Override with custom authorities based on the header
                        String roleValue = userRoleHeader.toUpperCase();
                        if (!roleValue.startsWith("ROLE_")) {
                            roleValue = "ROLE_" + roleValue;
                        }
                        
                        List<SimpleGrantedAuthority> authorities = 
                            List.of(new SimpleGrantedAuthority(roleValue));
                        
                        if (jwtUtil.validateToken(token)) {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userDetails.getUsername(),
                                    null,
                                    authorities
                            );
                            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                            
                            logger.info("User authenticated with header role: " + username + " with role: " + roleValue);
                        }
                    } else if (jwtUtil.validateToken(token)) {
                        // Use default authorities from userDetails
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        
                        // Debug log for authentication
                        logger.info("User authenticated with token role: " + username + 
                                   " with authorities: " + userDetails.getAuthorities());
                    }
                }
            } catch (Exception e) {
                logger.error("Error processing JWT token", e);
                // Continue the filter chain even if token processing fails
            }
        }

        chain.doFilter(request, response);
    }
}
