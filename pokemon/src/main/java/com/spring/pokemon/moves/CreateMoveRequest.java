package com.spring.pokemon.moves;

public record CreateMoveRequest(
        String name,
        String elementType 
) {}
