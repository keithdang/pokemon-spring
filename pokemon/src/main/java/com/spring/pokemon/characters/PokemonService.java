package com.spring.pokemon.characters;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class PokemonService {
	
	private static final List<Pokemon> pokemonList = new ArrayList<>();
	
	private static int pokemonCount = 0;
	
//	static {
//		pokemonList.add(new Pokemon(++pokemonCount, "charmander",ElementType.FIRE, null));
//		pokemonList.add(new Pokemon(++pokemonCount, "squirtle",ElementType.WATER, null));
//		pokemonList.add(new Pokemon(++pokemonCount, "bulbasaur",ElementType.GRASS, null));
//	}
	
	public List<Pokemon> findByUsername(String username){
		Predicate<? super Pokemon> predicate = 
				todo -> todo.getName().equalsIgnoreCase(username);
		return pokemonList.stream().filter(predicate).toList();
	}
	
	public Pokemon addTodo(String username, ElementType primary, ElementType secondary) {
		Pokemon pokemon = new Pokemon(username, primary, secondary);
		pokemonList.add(pokemon);
		return pokemon;
	}
	
	public void deleteById(int id) {
		Predicate<? super Pokemon> predicate = pokemon -> pokemon.getId() == id;
		pokemonList.removeIf(predicate);
	}

	public Pokemon findById(int id) {
		Predicate<? super Pokemon> predicate = pokemon -> pokemon.getId() == id;
		Pokemon pokemon = pokemonList.stream().filter(predicate).findFirst().get();
		return pokemon;
	}

	public void updatePokemon(Pokemon pokemon) {
		deleteById(pokemon.getId());
		pokemonList.add(pokemon);
	}
}
