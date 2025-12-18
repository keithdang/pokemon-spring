package com.spring.pokemon.characters;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.trainer.Trainer;
import com.spring.pokemon.trainer.repository.TrainerRepository;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {

    private final TrainerRepository trainerRepo;

    public PokemonController(TrainerRepository trainerRepo) {
        this.trainerRepo = trainerRepo;
    }

    @PostMapping
    public Pokemon addPokemon(@RequestBody CreatePokemonRequest req) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Trainer trainer = trainerRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        Pokemon pokemon = new Pokemon(
        );
        
        trainer.addPokemon(pokemon);
        trainerRepo.save(trainer);
//
//        trainer.add
//        trainerRepo.save(trainer);

        return pokemon;
    }
}

