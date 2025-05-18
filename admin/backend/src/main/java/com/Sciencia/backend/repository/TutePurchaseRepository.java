package com.Sciencia.backend.repository;


import com.Sciencia.backend.model.TutePurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutePurchaseRepository extends JpaRepository<TutePurchase, Long> {
}
