package com.spring.pokemon.characters;

import java.util.EnumMap;
import java.util.Map;

public class TypeEffectiveness {

    private static final Map<ElementType, Map<ElementType, Double>> EFFECTIVENESS =
            new EnumMap<>(ElementType.class);

    static {
        // FIRE
        add(ElementType.FIRE, ElementType.GRASS, 2.0);
        add(ElementType.FIRE, ElementType.ICE, 2.0);
        add(ElementType.FIRE, ElementType.BUG, 2.0);
        add(ElementType.FIRE, ElementType.STEEL, 2.0);
        add(ElementType.FIRE, ElementType.WATER, 0.5);
        add(ElementType.FIRE, ElementType.ROCK, 0.5);
        add(ElementType.FIRE, ElementType.FIRE, 0.5);

        // WATER
        add(ElementType.WATER, ElementType.FIRE, 2.0);
        add(ElementType.WATER, ElementType.ROCK, 2.0);
        add(ElementType.WATER, ElementType.GROUND, 2.0);
        add(ElementType.WATER, ElementType.WATER, 0.5);
        add(ElementType.WATER, ElementType.GRASS, 0.5);

        // GRASS
        add(ElementType.GRASS, ElementType.WATER, 2.0);
        add(ElementType.GRASS, ElementType.ROCK, 2.0);
        add(ElementType.GRASS, ElementType.GROUND, 2.0);
        add(ElementType.GRASS, ElementType.FIRE, 0.5);
        add(ElementType.GRASS, ElementType.GRASS, 0.5);
        add(ElementType.GRASS, ElementType.FLYING, 0.5);

        // ELECTRIC
        add(ElementType.ELECTRIC, ElementType.WATER, 2.0);
        add(ElementType.ELECTRIC, ElementType.FLYING, 2.0);
        add(ElementType.ELECTRIC, ElementType.GRASS, 0.5);
        add(ElementType.ELECTRIC, ElementType.ELECTRIC, 0.5);
        add(ElementType.ELECTRIC, ElementType.GROUND, 0.0);

        // NORMAL
        add(ElementType.NORMAL, ElementType.ROCK, 0.5);
        add(ElementType.NORMAL, ElementType.GHOST, 0.0);

        // GHOST
        add(ElementType.GHOST, ElementType.GHOST, 2.0);
        add(ElementType.GHOST, ElementType.NORMAL, 0.0);

        // FIGHTING
        add(ElementType.FIGHTING, ElementType.NORMAL, 2.0);
        add(ElementType.FIGHTING, ElementType.ROCK, 2.0);
        add(ElementType.FIGHTING, ElementType.STEEL, 2.0);
        add(ElementType.FIGHTING, ElementType.ICE, 2.0);
        add(ElementType.FIGHTING, ElementType.DARK, 2.0);

        add(ElementType.FIGHTING, ElementType.FLYING, 0.5);
        add(ElementType.FIGHTING, ElementType.POISON, 0.5);
        add(ElementType.FIGHTING, ElementType.BUG, 0.5);
        add(ElementType.FIGHTING, ElementType.PSYCHIC, 0.5);
        add(ElementType.FIGHTING, ElementType.FAIRY, 0.5);

        add(ElementType.FIGHTING, ElementType.GHOST, 0.0);
        
        //PSYCHIC
        add(ElementType.PSYCHIC, ElementType.FIGHTING, 2.0);
        add(ElementType.PSYCHIC, ElementType.POISON, 2.0);

        add(ElementType.PSYCHIC, ElementType.PSYCHIC, 0.5);
        add(ElementType.PSYCHIC, ElementType.STEEL, 0.5);

        add(ElementType.PSYCHIC, ElementType.DARK, 0.0);
        
        //BUG
        add(ElementType.BUG, ElementType.GRASS, 2.0);
        add(ElementType.BUG, ElementType.PSYCHIC, 2.0);
        add(ElementType.BUG, ElementType.DARK, 2.0);

        add(ElementType.BUG, ElementType.FIRE, 0.5);
        add(ElementType.BUG, ElementType.FIGHTING, 0.5);
        add(ElementType.BUG, ElementType.POISON, 0.5);
        add(ElementType.BUG, ElementType.FLYING, 0.5);
        add(ElementType.BUG, ElementType.GHOST, 0.5);
        add(ElementType.BUG, ElementType.STEEL, 0.5);
        add(ElementType.BUG, ElementType.FAIRY, 0.5);

        //ROCK
        add(ElementType.ROCK, ElementType.FIRE, 2.0);
        add(ElementType.ROCK, ElementType.ICE, 2.0);
        add(ElementType.ROCK, ElementType.FLYING, 2.0);
        add(ElementType.ROCK, ElementType.BUG, 2.0);

        add(ElementType.ROCK, ElementType.FIGHTING, 0.5);
        add(ElementType.ROCK, ElementType.GROUND, 0.5);
        add(ElementType.ROCK, ElementType.STEEL, 0.5);

        //GROUND
        add(ElementType.GROUND, ElementType.FIRE, 2.0);
        add(ElementType.GROUND, ElementType.ELECTRIC, 2.0);
        add(ElementType.GROUND, ElementType.POISON, 2.0);
        add(ElementType.GROUND, ElementType.ROCK, 2.0);
        add(ElementType.GROUND, ElementType.STEEL, 2.0);

        add(ElementType.GROUND, ElementType.GRASS, 0.5);
        add(ElementType.GROUND, ElementType.BUG, 0.5);

        add(ElementType.GROUND, ElementType.FLYING, 0.0);

        //ICE
        add(ElementType.ICE, ElementType.GRASS, 2.0);
        add(ElementType.ICE, ElementType.GROUND, 2.0);
        add(ElementType.ICE, ElementType.FLYING, 2.0);
        add(ElementType.ICE, ElementType.DRAGON, 2.0);

        add(ElementType.ICE, ElementType.FIRE, 0.5);
        add(ElementType.ICE, ElementType.WATER, 0.5);
        add(ElementType.ICE, ElementType.ICE, 0.5);
        add(ElementType.ICE, ElementType.STEEL, 0.5);

        //DRAGON
        add(ElementType.DRAGON, ElementType.DRAGON, 2.0);

        add(ElementType.DRAGON, ElementType.STEEL, 0.5);

        add(ElementType.DRAGON, ElementType.FAIRY, 0.0);

        //DARK
        add(ElementType.DARK, ElementType.PSYCHIC, 2.0);
        add(ElementType.DARK, ElementType.GHOST, 2.0);

        add(ElementType.DARK, ElementType.FIGHTING, 0.5);
        add(ElementType.DARK, ElementType.DARK, 0.5);
        add(ElementType.DARK, ElementType.FAIRY, 0.5);
    }

    private static void add(ElementType attack, ElementType defend, double multiplier) {
        EFFECTIVENESS
            .computeIfAbsent(attack, k -> new EnumMap<>(ElementType.class))
            .put(defend, multiplier);
    }

    public static double getMultiplier(ElementType attack, ElementType defend) {
        return EFFECTIVENESS
                .getOrDefault(attack, Map.of())
                .getOrDefault(defend, 1.0);
    }
}
