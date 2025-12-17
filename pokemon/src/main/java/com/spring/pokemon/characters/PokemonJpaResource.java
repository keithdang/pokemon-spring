package com.spring.pokemon.characters;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.todo.repository.TodoRepository;

@RestController
public class PokemonJpaResource {
	
	private PokemonService pokemonService;
	
	private PokemonRepository pokemonRepository;
	
	public PokemonJpaResource(PokemonService todoService, PokemonRepository todoRepository) {
		this.pokemonService = todoService;
		this.pokemonRepository = todoRepository;
	}
	
	@GetMapping("/users/{username}/pokemon")
	public List<Pokemon> retrievePokemons(@PathVariable String username) {
		//return todoService.findByUsername(username);
		return pokemonRepository.findByName(username);
	}

	@GetMapping("/users/{username}/pokemon/{id}")
	public Pokemon retrievePokemon(@PathVariable String username,
			@PathVariable int id) {
		//return todoService.findById(id);
		return pokemonRepository.findById(id).get();
	}

	@DeleteMapping("/users/{username}/pokemon/{id}")
	public ResponseEntity<Void> deletePokemon(@PathVariable String username,
			@PathVariable int id) {
		//todoService.deleteById(id);
		pokemonRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{username}/pokemon/{id}")
	public Pokemon updatePokemon(@PathVariable String username,
			@PathVariable int id, @RequestBody Pokemon todo) {
		//todoService.updateTodo(todo);
		pokemonRepository.save(todo);
		return todo;
	}

	@PostMapping("/users/{username}/pokemon")
	public Pokemon createPokemon(@PathVariable String username,
			 @RequestBody Pokemon todo) {
		todo.setName(username);
		todo.setId(null);
		return pokemonRepository.save(todo);
	}

}