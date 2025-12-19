package com.spring.pokemon.moves.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.pokemon.moves.Move;

public interface MoveRepository extends JpaRepository<Move, Integer>{
	
	List<Move> findByName(String name);
	
	List<Move> findAll();

}
