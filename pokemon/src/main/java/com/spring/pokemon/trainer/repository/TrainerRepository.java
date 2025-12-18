package com.spring.pokemon.trainer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.pokemon.trainer.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, Integer> {
    Optional<Trainer> findByUsername(String username);
}
