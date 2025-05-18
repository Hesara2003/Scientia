package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.Tute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuteRepository extends JpaRepository<Tute, Long> {
}

