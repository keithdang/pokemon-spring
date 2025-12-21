package com.spring.pokemon.characters;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.spring.pokemon.todo.Todo;
import com.spring.pokemon.todo.TodoService;

public class PokemonResource {
	
	private PokemonService todoService;
	
	public PokemonResource(PokemonService todoService) {
		this.todoService = todoService;
	}
	
//	@GetMapping("/users/{username}/pokemon")
//	public List<Pokemon> retrieveTodos(@PathVariable String username) {
//		return todoService.findByUsername(username);
//	}
//
//	@GetMapping("/users/{username}/pokemon/{id}")
//	public Pokemon retrieveTodo(@PathVariable String username,
//			@PathVariable int id) {
//		return todoService.findById(id);
//	}
//
//	@DeleteMapping("/users/{username}/pokemon/{id}")
//	public ResponseEntity<Void> deleteTodo(@PathVariable String username,
//			@PathVariable int id) {
//		todoService.deleteById(id);
//		return ResponseEntity.noContent().build();
//	}

//	@PutMapping("/users/{username}/pokemon/{id}")
//	public Pokemon updateTodo(@PathVariable String username,
//			@PathVariable int id, @RequestBody Pokemon todo) {
//		todoService.updatePokemon(todo);
//		return todo;
//	}
//
//	@PostMapping("/users/{username}/pokemon")
//	public Pokemon  createTodo(@PathVariable String username,
//			 @RequestBody Pokemon todo) {
//		Pokemon createdTodo = todoService.addTodo(username, todo.getLevel() );
//		
//		return createdTodo;
//	}

}