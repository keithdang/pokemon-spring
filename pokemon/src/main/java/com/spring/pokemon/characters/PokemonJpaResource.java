package com.spring.pokemon.characters;

import java.util.ArrayList;
import java.util.Comparator;
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

	private PokemonRepository pokemonRepository;
	private final TrainerRepository trainerRepository;
    private final PokemonSpeciesRepository speciesRepository;
	
	public PokemonJpaResource( 
			PokemonRepository todoRepository,
			TrainerRepository trainerRepository,
			PokemonSpeciesRepository speciesRepository) {
		this.pokemonRepository = todoRepository;
		this.trainerRepository = trainerRepository;
		this.speciesRepository = speciesRepository;
	}

	@GetMapping("/pokemon")
	public List<Pokemon> retrieveAllPokemon() {
		return pokemonRepository.findAll();
	}
	
	@GetMapping("/users/{username}/pokemon")
	public List<Pokemon> retrievePokemons(@PathVariable String username) {
		return pokemonRepository.findByOwnerUsername(username);
	}

	@GetMapping("/users/{username}/pokemon/{id}")
	public Pokemon retrievePokemon(@PathVariable String username,
			@PathVariable int id) {
		Pokemon pokemon =  pokemonRepository.findById(id).get();
//		System.out.println("KDLOG: "+pokemon.getCurrentHp1());
		return pokemon;
	}

	@DeleteMapping("/users/{username}/pokemon/{id}")
	public ResponseEntity<Void> deletePokemon(@PathVariable String username,
			@PathVariable int id) {
		pokemonRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{username}/pokemon/{id}")
	public Pokemon updatePokemon(@PathVariable String username,
			@PathVariable int id, @RequestBody Pokemon todo) {
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

	@GetMapping("/users/{username}/pokemon/{id}/moves/{moveId}")
	public Move getPokemonMove(
	        @PathVariable String username,
	        @PathVariable Integer id,
	        @PathVariable Integer moveId
	) {
	    Pokemon pokemon = pokemonRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));

	    // Verify ownership
	    if (!pokemon.getOwner().getUsername().equals(username)) {
	        throw new RuntimeException("Not your Pokémon");
	    }

	    return pokemon.getMoves().stream()
	            .filter(move -> move.getId().equals(moveId))
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("Move not found for this Pokémon"));
	}
	
	@PutMapping("/users/{username}/pokemon/{id}/moves/{moveId}/opp/{oppId}")
	public List<Pokemon> attack(
	        @PathVariable String username,
	        @PathVariable Integer id,
	        @PathVariable Integer moveId,
	        @PathVariable Integer oppId
	) {
	    Pokemon pokemon = pokemonRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));

	    Pokemon oppPokemon = pokemonRepository.findById(oppId)
	            .orElseThrow(() -> new RuntimeException("Pokemon not found")); 
	    // Verify ownership
	    if (!pokemon.getOwner().getUsername().equals(username)) {
	        throw new RuntimeException("Not your Pokémon");
	    }

	    Move userMove = pokemon.getMoves().stream()
	            .filter(move -> move.getId().equals(moveId))
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("Move not found for this Pokémon"));
//	    Move oppMove = oppPokemon.getMoves().iterator().next();
	    int userDamage = DamageCalculator.calculateDamage(pokemon, oppPokemon, userMove);
	    oppPokemon.takeDamage(userDamage);
	    if(oppPokemon.getCurrentHp() > 0) {
	        Move oppMove = oppPokemon.getMoves().stream()
	                .max(Comparator.comparingInt(
	                        move -> DamageCalculator.calculateDamage(
	                                oppPokemon,
	                                pokemon,
	                                move
	                        )
	                ))
	                .orElseThrow(() -> new RuntimeException("Opponent has no moves"));

	        int oppDamage = DamageCalculator.calculateDamage(oppPokemon, pokemon, oppMove);
	        pokemon.takeDamage(oppDamage);
	    }
	    ArrayList<Pokemon> pokeList = new ArrayList<Pokemon>();
	    pokeList.add(pokemonRepository.save(oppPokemon));
	    pokeList.add(pokemonRepository.save(pokemon));
	    return pokeList;
	}
}