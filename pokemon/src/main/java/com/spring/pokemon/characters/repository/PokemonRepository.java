package com.spring.pokemon.characters.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.pokemon.characters.Pokemon;
import com.spring.pokemon.todo.Todo;

public interface PokemonRepository extends JpaRepository<Pokemon, Integer>{
	
	List<Pokemon> findByName(String name);

}
