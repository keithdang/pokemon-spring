package com.spring.pokemon.species;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pokemon.species.repository.PokemonSpeciesRepository;

@RestController
public class PokemonSpeciesJpaResource {
	
	private PokemonSpeciesService pokemonService;
	
	private PokemonSpeciesRepository pokemonRepository;
	
	public PokemonSpeciesJpaResource(PokemonSpeciesService todoService, PokemonSpeciesRepository todoRepository) {
		this.pokemonService = todoService;
		this.pokemonRepository = todoRepository;
	}

	@GetMapping("/pokemonspecies")
	public List<PokemonSpecies> retrieveAllPokemon() {
		//return todoService.findByUsername(username);
		return pokemonRepository.findAll();
	}
	
	@GetMapping("/users/{username}/pokemonspecies")
	public List<PokemonSpecies> retrievePokemons(@PathVariable String username) {
		//return todoService.findByUsername(username);
		return pokemonRepository.findByName(username);
	}

	@GetMapping("/users/{username}/pokemonspecies/{id}")
	public PokemonSpecies retrievePokemon(@PathVariable String username,
			@PathVariable int id) {
		//return todoService.findById(id);
		return pokemonRepository.findById(id).get();
	}

	@DeleteMapping("/users/{username}/pokemonspecies/{id}")
	public ResponseEntity<Void> deletePokemon(@PathVariable String username,
			@PathVariable int id) {
		//todoService.deleteById(id);
		pokemonRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{username}/pokemonspecies/{id}")
	public PokemonSpecies updatePokemon(@PathVariable String username,
			@PathVariable int id, @RequestBody PokemonSpecies todo) {
		//todoService.updateTodo(todo);
		pokemonRepository.save(todo);
		return todo;
	}

	@PostMapping("/users/{username}/pokemonspecies")
	public PokemonSpecies createPokemon(@PathVariable String username,
			 @RequestBody PokemonSpecies todo) {
		todo.setName(username);
		todo.setId(null);
		return pokemonRepository.save(todo);
	}

}