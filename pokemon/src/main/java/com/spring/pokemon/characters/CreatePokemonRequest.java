package com.spring.pokemon.characters;

public record CreatePokemonRequest(
        String name,
        int level,
        Integer speciesId
) {}
