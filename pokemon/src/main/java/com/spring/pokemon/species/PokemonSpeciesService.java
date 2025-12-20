package com.spring.pokemon.species;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

import com.spring.pokemon.characters.ElementType;
import com.spring.pokemon.todo.Todo;

@Service
public class PokemonSpeciesService {
	
	private static final List<PokemonSpecies> pokemonList = new ArrayList<>();
	
	private static int pokemonCount = 0;
	
//	static {
//		pokemonList.add(new Pokemon(++pokemonCount, "charmander",ElementType.FIRE, null));
//		pokemonList.add(new Pokemon(++pokemonCount, "squirtle",ElementType.WATER, null));
//		pokemonList.add(new Pokemon(++pokemonCount, "bulbasaur",ElementType.GRASS, null));
//	}
	
	public List<PokemonSpecies> findAll(){
		return pokemonList.stream().toList();
	}
	
	public List<PokemonSpecies> findByUsername(String username){
		Predicate<? super PokemonSpecies> predicate = 
				todo -> todo.getName().equalsIgnoreCase(username);
		return pokemonList.stream().filter(predicate).toList();
	}
	
//	public PokemonSpecies addTodo(String username, ElementType primary, ElementType secondary) {
//		PokemonSpecies pokemon = new PokemonSpecies(username, primary, secondary);
//		pokemonList.add(pokemon);
//		return pokemon;
//	}
	
	public void deleteById(int id) {
		Predicate<? super PokemonSpecies> predicate = pokemon -> pokemon.getId() == id;
		pokemonList.removeIf(predicate);
	}

	public PokemonSpecies findById(int id) {
		Predicate<? super PokemonSpecies> predicate = pokemon -> pokemon.getId() == id;
		PokemonSpecies pokemon = pokemonList.stream().filter(predicate).findFirst().get();
		return pokemon;
	}

	public void updatePokemon(PokemonSpecies pokemon) {
		deleteById(pokemon.getId());
		pokemonList.add(pokemon);
	}
}
