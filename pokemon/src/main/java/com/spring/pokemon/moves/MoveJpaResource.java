package com.spring.pokemon.moves;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pokemon.characters.CreatePokemonRequest;
import com.spring.pokemon.characters.ElementType;
import com.spring.pokemon.moves.repository.MoveRepository;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;

@RestController
public class MoveJpaResource {
	
	
	private MoveRepository moveRepository;
	
	public MoveJpaResource (MoveRepository moveRepository) {
		this.moveRepository = moveRepository;
	}

	@GetMapping("/moves")
	public List<Move> retrieveAllMoves() {
		return moveRepository.findAll();
	}
	
	@GetMapping("/moves/{id}")
	public Optional<Move> retrieveMove(@PathVariable int id) {
		return moveRepository.findById(id);
	}


	@DeleteMapping("/moves/{id}")
	public ResponseEntity<Void> deleteMove(@PathVariable int id) {
		moveRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}


	@PostMapping("/moves")
	public Move createMove(@RequestBody CreateMoveRequest request) {
		Move move = new Move();
		move.setName(request.name());
		move.setId(null);
		move.setType(ElementType.valueOf(request.elementType().toUpperCase()));
		return moveRepository.save(move);
	}

}