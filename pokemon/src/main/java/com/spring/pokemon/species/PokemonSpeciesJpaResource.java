package com.spring.pokemon.species;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pokemon.characters.ElementType;
import com.spring.pokemon.characters.Pokemon;
import com.spring.pokemon.moves.Move;
import com.spring.pokemon.moves.repository.MoveRepository;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;

@RestController
public class PokemonSpeciesJpaResource {
	
	private PokemonSpeciesService pokemonService;
	
	private PokemonSpeciesRepository pokemonRepository;
	private final MoveRepository moveRepository;
	
	public PokemonSpeciesJpaResource(PokemonSpeciesService todoService, 
			PokemonSpeciesRepository todoRepository,
			MoveRepository moveRepository) {
		this.pokemonService = todoService;
		this.pokemonRepository = todoRepository;
		this.moveRepository = moveRepository;
	}

	@GetMapping("/pokemonspecies")
	public List<PokemonSpecies> retrieveAllPokemon() {
		return pokemonRepository.findAll();
	}
	
	@GetMapping("/pokemonspecies/{id}")
	public PokemonSpecies getPokemon(
	        @PathVariable Integer id
	) {
		PokemonSpecies pokemon = pokemonRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));

	    return pokemon;
	}
	
	@GetMapping("/pokemonspecies/{id}/moves")
	public Set<Move> getPokemonMoves(
	        @PathVariable Integer id
	) {
		PokemonSpecies pokemon = pokemonRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));

	    return pokemon.getLearnableMoves();
	}
	
	@GetMapping("/users/{username}/pokemonspecies")
	public List<PokemonSpecies> retrievePokemons(@PathVariable String username) {
		return pokemonRepository.findByName(username);
	}

	@GetMapping("/users/{username}/pokemonspecies/{id}")
	public PokemonSpecies retrievePokemon(@PathVariable String username,
			@PathVariable int id) {
		return pokemonRepository.findById(id).get();
	}

	@DeleteMapping("pokemonspecies/{id}")
	public ResponseEntity<Void> deletePokemon(@PathVariable int id) {
		pokemonRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{username}/pokemonspecies/{id}")
	public PokemonSpecies updatePokemon(@PathVariable String username,
			@PathVariable int id, @RequestBody PokemonSpecies todo) {
		pokemonRepository.save(todo);
		return todo;
	}

	@PostMapping("/pokemonspecies")
	public PokemonSpecies createPokemon(@RequestBody PokemonSpecies pokemon) {
        return pokemonRepository.save(pokemon);
	}
	
	@PostMapping("/pokemonspecies/{speciesId}/moves/{moveId}")
	public PokemonSpecies addMoveToSpecies(
	        @PathVariable Integer speciesId,
	        @PathVariable Integer moveId) {

	    PokemonSpecies species = pokemonRepository.findById(speciesId)
	        .orElseThrow(() -> new RuntimeException("Species not found"));

	    Move move = moveRepository.findById(moveId)
	        .orElseThrow(() -> new RuntimeException("Move not found"));

	    species.getLearnableMoves().add(move);
	    return pokemonRepository.save(species);
	}
}