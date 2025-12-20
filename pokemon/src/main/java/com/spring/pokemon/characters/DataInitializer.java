package com.spring.pokemon.characters;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.species.PokemonSpecies;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;
import com.spring.pokemon.trainer.Trainer;
import com.spring.pokemon.trainer.repository.TrainerRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TrainerRepository trainerRepository;
    private final PokemonSpeciesRepository speciesRepository;
    private final PokemonRepository pokemonRepository;

    public DataInitializer(
            TrainerRepository trainerRepository,
            PokemonSpeciesRepository speciesRepository,
            PokemonRepository pokemonRepository
    ) {
        this.trainerRepository = trainerRepository;
        this.speciesRepository = speciesRepository;
        this.pokemonRepository = pokemonRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {

        String trainerName = "computer";

        Trainer computer = trainerRepository.findByUsername(trainerName)
                .orElseGet(() -> trainerRepository.save(new Trainer(trainerName)));

        PokemonSpecies bulbasaur = speciesRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Bulbasaur species missing"));

        if (pokemonRepository.findByOwnerUsername(trainerName).isEmpty()) {

            Pokemon p = new Pokemon();
            p.setName("Bulbasaur");
            p.setLevel(5);
            p.setOwner(computer);
            p.setSpecies(bulbasaur);

            bulbasaur.getLearnableMoves()
                     .stream()
                     .limit(4)
                     .forEach(p.getMoves()::add);

            pokemonRepository.save(p);
        }
    }
}
