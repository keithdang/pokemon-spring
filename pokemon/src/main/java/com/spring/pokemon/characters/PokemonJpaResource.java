package com.spring.pokemon.characters;

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

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.moves.Move;
import com.spring.pokemon.species.PokemonSpecies;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;
import com.spring.pokemon.trainer.Trainer;
import com.spring.pokemon.trainer.repository.TrainerRepository;

@RestController
public class PokemonJpaResource {
	
//	private PokemonService pokemonService;
	
	private PokemonRepository pokemonRepository;
	private final TrainerRepository trainerRepository;
    private final PokemonSpeciesRepository speciesRepository;
	
	public PokemonJpaResource(
//			PokemonService todoService, 
			PokemonRepository todoRepository,
			TrainerRepository trainerRepository,
			PokemonSpeciesRepository speciesRepository) {
//		this.pokemonService = todoService;
		this.pokemonRepository = todoRepository;
		this.trainerRepository = trainerRepository;
		this.speciesRepository = speciesRepository;
	}

	@GetMapping("/pokemon")
	public List<Pokemon> retrieveAllPokemon() {
		//return todoService.findByUsername(username);
		return pokemonRepository.findAll();
	}
	
	@GetMapping("/users/{username}/pokemon")
	public List<Pokemon> retrievePokemons(@PathVariable String username) {
		return pokemonRepository.findByOwnerUsername(username);
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
			 @RequestBody CreatePokemonRequest request) {
        Trainer trainer = trainerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        PokemonSpecies species = speciesRepository.findById(request.speciesId())
                .orElseThrow(() -> new RuntimeException("Species not found"));
        System.out.println("KDLOG:"+request);

        Pokemon pokemon = new Pokemon();
        pokemon.setName(request.name());
        pokemon.setLevel(request.level());
        pokemon.setOwner(trainer);
        pokemon.setSpecies(species);
        species.getLearnableMoves()
        .stream()
        .limit(4)
        .forEach(pokemon.getMoves()::add);
        return pokemonRepository.save(pokemon);
	}
	
	@GetMapping("/users/{username}/pokemon/{id}/moves")
	public Set<Move> getPokemonMoves(
	        @PathVariable String username,
	        @PathVariable Integer id
	) {
	    Pokemon pokemon = pokemonRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));

	    // (Optional but recommended) verify ownership
	    if (!pokemon.getOwner().getUsername().equals(username)) {
	        throw new RuntimeException("Not your Pokémon");
	    }

	    return pokemon.getMoves();
	}

}