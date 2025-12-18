package com.spring.pokemon.species.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.pokemon.species.PokemonSpecies;

public interface PokemonSpeciesRepository extends JpaRepository<PokemonSpecies, Integer>{
	
	List<PokemonSpecies> findByName(String name);
	
	List<PokemonSpecies> findAll();

}
