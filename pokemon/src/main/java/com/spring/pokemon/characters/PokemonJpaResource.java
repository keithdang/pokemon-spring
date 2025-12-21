package com.spring.pokemon.characters;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

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
	
//	@PutMapping("/users/{username}/pokemon/{id}/moves/{moveId}/opp/{oppId}")
//	public List<Pokemon> attack(
//	        @PathVariable String username,
//	        @PathVariable Integer id,
//	        @PathVariable Integer moveId,
//	        @PathVariable Integer oppId
//	) {
//	    Pokemon pokemon = pokemonRepository.findById(id)
//	            .orElseThrow(() -> new RuntimeException("Pokemon not found"));
//
//	    Pokemon oppPokemon = pokemonRepository.findById(oppId)
//	            .orElseThrow(() -> new RuntimeException("Pokemon not found")); 
//	    // Verify ownership
//	    if (!pokemon.getOwner().getUsername().equals(username)) {
//	        throw new RuntimeException("Not your Pokémon");
//	    }
//
//	    Move userMove = pokemon.getMoves().stream()
//	            .filter(move -> move.getId().equals(moveId))
//	            .findFirst()
//	            .orElseThrow(() -> new RuntimeException("Move not found for this Pokémon"));
//	    
//	    int userDamage = DamageCalculator.calculateDamage(pokemon, oppPokemon, userMove);
//	    oppPokemon.takeDamage(userDamage);
//	    if(oppPokemon.getCurrentHp() > 0) {
//	        Move oppMove = oppPokemon.getMoves().stream()
//	                .max(Comparator.comparingInt(
//	                        move -> DamageCalculator.calculateDamage(
//	                                oppPokemon,
//	                                pokemon,
//	                                move
//	                        )
//	                ))
//	                .orElseThrow(() -> new RuntimeException("Opponent has no moves"));
//
//	        int oppDamage = DamageCalculator.calculateDamage(oppPokemon, pokemon, oppMove);
//	        pokemon.takeDamage(oppDamage);
//	    }
//	    ArrayList<Pokemon> pokeList = new ArrayList<Pokemon>();
//	    pokeList.add(pokemonRepository.save(oppPokemon));
//	    pokeList.add(pokemonRepository.save(pokemon));
//	    return pokeList;
//	}
	@PutMapping("/users/{username}/pokemon/{id}/moves/{moveId}/opp/{oppId}")
	public BattleResult attack(
	        @PathVariable String username,
	        @PathVariable Integer id,
	        @PathVariable Integer moveId,
	        @PathVariable Integer oppId
	) {
		List<String> log = new ArrayList<>();
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
	    
//	    int userDamage = DamageCalculator.calculateDamage(pokemon, oppPokemon, userMove);
//	    oppPokemon.takeDamage(userDamage);
	    double playerMultiplier =
	            DamageCalculator.calculateMultiplier(pokemon, oppPokemon, userMove);

	    int playerDamage = (int) Math.round(
	    		userMove.getDamage() * playerMultiplier);

	    oppPokemon.takeDamage(playerDamage);
	    
	    log.add(pokemon.getName() + " used " + userMove.getName() + "!");
	    String eff = DamageCalculator.effectivenessText(playerMultiplier);
	    if (!eff.isEmpty()) log.add(eff);
	    
	    if(oppPokemon.getCurrentHp() > 0) {
	        Move oppMove = oppPokemon.getMoves().stream()
	                .max(Comparator.comparingDouble(
	                        move -> DamageCalculator.calculateMultiplier(
	                                oppPokemon,
	                                pokemon,
	                                move
	                        )
	                ))
	                .orElseThrow(() -> new RuntimeException("Opponent has no moves"));

	        double oppMultiplier =
	                DamageCalculator.calculateMultiplier(oppPokemon, pokemon, oppMove);

	        int oppDamage = (int) Math.round(
	                oppMove.getDamage() * oppMultiplier);

	        pokemon.takeDamage(oppDamage);

	        log.add(oppPokemon.getName() + " used " + oppMove.getName() + "!");
	        String oppEff = DamageCalculator.effectivenessText(oppMultiplier);
	        if (!oppEff.isEmpty()) log.add(oppEff);
	    }else {
	        log.add(oppPokemon.getName() + " has fainted!");
	        int level = pokemon.getLevel();
	        pokemon.gainExperience(oppPokemon.getLevel() * 10);
	        if(pokemon.getLevel() > level) {
	        	log.add(pokemon.getName() + " levelled up to "+pokemon.getLevel()+ "!");
	        }
	    }
	    
//	    ArrayList<Pokemon> pokeList = new ArrayList<Pokemon>();
	    pokemonRepository.save(oppPokemon);
	    pokemonRepository.save(pokemon);
	    return new BattleResult(pokemon, oppPokemon, log);
	}
	
	@PutMapping("/change/users/{username}/pokemon/{id}")
	public Pokemon changePokemon(@PathVariable String username,
			@PathVariable int id) {
	       Trainer computer = trainerRepository.findByUsername(username)
	                .orElseGet(() -> trainerRepository.save(new Trainer(username)));
	       pokemonRepository.deleteById(id);
	       long speciesCount = speciesRepository.count();
	       if (speciesCount == 0) {
	           throw new RuntimeException("No Pokémon species available");
	       }
	       
	       int randomIndex = ThreadLocalRandom.current()
	               .nextInt((int) speciesCount);
	       
	       PokemonSpecies randomSpecies = speciesRepository
	               .findAll()
	               .stream()
	               .skip(randomIndex)
	               .findFirst()
	               .orElseThrow(() -> new RuntimeException("Failed to select random species"));

	       Pokemon newPokemon = new Pokemon();
	       newPokemon.setName(randomSpecies.getName());
	       newPokemon.setLevel(5);
	       newPokemon.setOwner(computer);
	       newPokemon.setSpecies(randomSpecies);
	       randomSpecies.getLearnableMoves().stream()
           .limit(4)
           .forEach(newPokemon.getMoves()::add);

	       return pokemonRepository.save(newPokemon);
	}
}