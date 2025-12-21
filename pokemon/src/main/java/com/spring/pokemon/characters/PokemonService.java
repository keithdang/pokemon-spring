package com.spring.pokemon.characters;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.species.PokemonSpecies;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;
import com.spring.pokemon.trainer.Trainer;
import com.spring.pokemon.trainer.repository.TrainerRepository;

@Service
public class PokemonService {
	private final PokemonRepository pokemonRepository;
    private final PokemonSpeciesRepository speciesRepository;
    private final TrainerRepository trainerRepository;

    public PokemonService(
            PokemonRepository pokemonRepository,
            PokemonSpeciesRepository speciesRepository,
            TrainerRepository trainerRepository) {
        this.pokemonRepository = pokemonRepository;
        this.speciesRepository = speciesRepository;
        this.trainerRepository = trainerRepository;
    }
	
    @Transactional
    public Pokemon replacePokemon(String username, int oldPokemonId) {
        Trainer trainer = trainerRepository.findByUsername(username)
                .orElseGet(() -> trainerRepository.save(new Trainer(username)));

        pokemonRepository.deleteById(oldPokemonId);

        long speciesCount = speciesRepository.count();
        if (speciesCount == 0) {
            throw new RuntimeException("No Pokémon species available");
        }

        int randomIndex = ThreadLocalRandom.current().nextInt((int) speciesCount);

        PokemonSpecies randomSpecies = speciesRepository.findAll()
                .stream()
                .skip(randomIndex)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Failed to select random species"));

        Pokemon newPokemon = new Pokemon();
        newPokemon.setName(randomSpecies.getName());
        newPokemon.setLevel(5);
        newPokemon.setOwner(trainer);
        newPokemon.setSpecies(randomSpecies);

        randomSpecies.getLearnableMoves()
                .stream()
                .limit(4)
                .forEach(newPokemon.getMoves()::add);

        return pokemonRepository.save(newPokemon);
    }
//	private static final List<Pokemon> pokemonList = new ArrayList<>();
//	
//	private static int pokemonCount = 0;
//	
//	
//	public List<Pokemon> findAll(){
//		return pokemonList.stream().toList();
//	}
//	
//	public List<Pokemon> findByUsername(String username){
//		Predicate<? super Pokemon> predicate = 
//				todo -> todo.getTrainer().equalsIgnoreCase(username);
//		System.out.println("KDLOG2"+username);
//		System.out.println("KDLOG"+pokemonList);
//		System.out.println("KDLOG"+predicate);
//		return pokemonList.stream().filter(predicate).toList();
//	}
//	
//	public Pokemon addTodo(String username, int level) {
//		Pokemon pokemon = new Pokemon();
//		pokemonList.add(pokemon);
//		return pokemon;
//	}
//	
//	public void deleteById(int id) {
//		Predicate<? super Pokemon> predicate = pokemon -> pokemon.getId() == id;
//		pokemonList.removeIf(predicate);
//	}
//
//	public Pokemon findById(int id) {
//		Predicate<? super Pokemon> predicate = pokemon -> pokemon.getId() == id;
//		Pokemon pokemon = pokemonList.stream().filter(predicate).findFirst().get();
//		return pokemon;
//	}
//
//	public void updatePokemon(Pokemon pokemon) {
//		deleteById(pokemon.getId());
//		pokemonList.add(pokemon);
//	}
}
