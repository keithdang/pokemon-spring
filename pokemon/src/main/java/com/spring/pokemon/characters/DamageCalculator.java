package com.spring.pokemon.characters;

import com.spring.pokemon.moves.Move;

public class DamageCalculator {

    public static int calculateDamage(
            Pokemon attacker,
            Pokemon defender,
            Move move
    ) {
        double baseDamage = move.getDamage();

        ElementType moveType = move.getType();

        // 1️⃣ Type effectiveness (handles 1 or 2 types)
        double typeMultiplier = defender.getSpecies().getTypes().stream()
                .mapToDouble(defType ->
                        TypeEffectiveness.getMultiplier(moveType, defType))
                .reduce(1.0, (a, b) -> a * b);

        // If immune, no damage
        if (typeMultiplier == 0.0) {
            return 0;
        }

        // 3️⃣ Final damage
        return (int) Math.round(baseDamage * typeMultiplier);
    }
}