package com.Sciencia.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Specific origin for frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Include OPTIONS for preflight
                .allowedHeaders("*")
                .allowCredentials(true); // Allow Authorization header with JWT
    }
}