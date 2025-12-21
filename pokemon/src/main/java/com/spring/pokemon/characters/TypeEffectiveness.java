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

        // Add more as needed
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
