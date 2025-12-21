package com.spring.pokemon.characters;

import com.spring.pokemon.moves.Move;

public class DamageCalculator {

    public static double calculateMultiplier(
            Pokemon attacker,
            Pokemon defender,
            Move move
    ) {
//        double baseDamage = move.getDamage();

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
//        return (int) Math.round(baseDamage * typeMultiplier);
        return typeMultiplier;
    }
    
    public static String effectivenessText(double multiplier) {
        if (multiplier == 0.0) return "It had no effect!";
        if (multiplier >= 2.0) return "It's super effective!";
        if (multiplier < 1.0) return "It's not very effective...";
        return "";
    }
}