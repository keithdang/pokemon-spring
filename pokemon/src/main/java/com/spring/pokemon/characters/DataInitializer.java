package com.spring.pokemon.characters;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.spring.pokemon.characters.repository.PokemonRepository;
import com.spring.pokemon.moves.Move;
import com.spring.pokemon.moves.repository.MoveRepository;
import com.spring.pokemon.species.PokemonSpecies;
import com.spring.pokemon.species.repository.PokemonSpeciesRepository;
import com.spring.pokemon.trainer.Trainer;
import com.spring.pokemon.trainer.repository.TrainerRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TrainerRepository trainerRepository;
    private final PokemonSpeciesRepository speciesRepository;
    private final PokemonRepository pokemonRepository;
    private final MoveRepository moveRepository;

    public DataInitializer(
            TrainerRepository trainerRepository,
            PokemonSpeciesRepository speciesRepository,
            PokemonRepository pokemonRepository,
            MoveRepository moveRepository
    ) {
        this.trainerRepository = trainerRepository;
        this.speciesRepository = speciesRepository;
        this.pokemonRepository = pokemonRepository;
        this.moveRepository = moveRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {

        String trainerName = "computer";
        String keith = "keith";
        String in28minutes = "in28minutes";

        Trainer computer = trainerRepository.findByUsername(trainerName)
                .orElseGet(() -> trainerRepository.save(new Trainer(trainerName)));
        
        trainerRepository.findByUsername(keith)
                .orElseGet(() -> trainerRepository.save(new Trainer(keith)));
        
        trainerRepository.findByUsername(in28minutes)
        .orElseGet(() -> trainerRepository.save(new Trainer(in28minutes)));

        PokemonSpecies bulbasaur = speciesRepository.findById(1)
        	    .orElseGet(() -> {
        	        PokemonSpecies s = new PokemonSpecies();
        	        s.setName("Bulbasaur");
        	        s.setTypes(Set.of(ElementType.GRASS, ElementType.POISON)); // or Enum if you use one
        	        s.setId(1);
        	        s.setBaseHp(10);
        	        return speciesRepository.save(s);
        	    });
        
        PokemonSpecies charmander = speciesRepository.findById(4)
        	    .orElseGet(() -> {
        	        PokemonSpecies s = new PokemonSpecies();
        	        s.setName("Charmander");
        	        s.setTypes(Set.of(ElementType.FIRE));
        	        s.setId(4);
        	        s.setBaseHp(10);
        	        return speciesRepository.save(s);
        	    });
        
        PokemonSpecies squirtle = speciesRepository.findById(7)
        	    .orElseGet(() -> {
        	        PokemonSpecies s = new PokemonSpecies();
        	        s.setName("Squirtle");
        	        s.setTypes(Set.of(ElementType.WATER));
        	        s.setId(7);
        	        s.setBaseHp(10);
        	        return speciesRepository.save(s);
        	    });

        Move tackle = createMoveIfMissing("Tackle", 10, ElementType.NORMAL);
        Move razorLeaf = createMoveIfMissing("Razor Leaf", 10, ElementType.GRASS);
        Move flamethrower= createMoveIfMissing("Flamethrower", 10, ElementType.FIRE);
        Move tailWhip = createMoveIfMissing("Tail Whip", 10, ElementType.NORMAL);
        Move bubblebeam = createMoveIfMissing("Bubblebeam", 10, ElementType.WATER);
        Move hydropump = createMoveIfMissing("Hydro Pump", 15, ElementType.WATER);
        
        if (bulbasaur.getLearnableMoves().isEmpty()) {
            bulbasaur.getLearnableMoves().add(tackle);
            bulbasaur.getLearnableMoves().add(razorLeaf);

            speciesRepository.save(bulbasaur);
        }
        
        if (charmander.getLearnableMoves().isEmpty()) {
        	charmander.getLearnableMoves().add(flamethrower);
        	charmander.getLearnableMoves().add(tailWhip);

            speciesRepository.save(charmander);
        }
        
        if (squirtle.getLearnableMoves().isEmpty()) {
        	squirtle.getLearnableMoves().add(bubblebeam);
        	squirtle.getLearnableMoves().add(hydropump);

            speciesRepository.save(squirtle);
        }
        
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
    
    private Move createMoveIfMissing(String name, int damage, ElementType type) {
        return moveRepository
                .findByNameIgnoreCase(name)
                .orElseGet(() -> {
                    Move m = new Move();
                    m.setName(name);
                    m.setDamage(damage);
                    m.setType(type);
                    return moveRepository.save(m);
                });
    }
}
