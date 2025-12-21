package com.spring.pokemon.characters;

import java.util.List;

//DTO
public class BattleResult {

    private Pokemon playerPokemon;
    private Pokemon opponentPokemon;
    private List<String> log;

    public BattleResult(
            Pokemon playerPokemon,
            Pokemon opponentPokemon,
            List<String> log
    ) {
        this.playerPokemon = playerPokemon;
        this.opponentPokemon = opponentPokemon;
        this.log = log;
    }

    public Pokemon getPlayerPokemon() {
        return playerPokemon;
    }

    public Pokemon getOpponentPokemon() {
        return opponentPokemon;
    }

    public List<String> getLog() {
        return log;
    }
}
