package com.spring.pokemon.characters;

import java.time.LocalDate;
import java.util.EnumSet;
import java.util.Set;

import com.spring.pokemon.species.PokemonSpecies;
import com.spring.pokemon.trainer.Trainer;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Pokemon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //TODO RESOLVE WHEN SWITCHING OUT OF H2
	private Integer id;

	private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name="pokemon_species_id")
    private PokemonSpecies species;

    private int level;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "trainer_id")
    private Trainer owner;
	
	public Pokemon() {
	}
	
//	public Pokemon(String name, int level) {
//        this.name = name;
//        this.level = level;
//    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getTrainer() {
		return owner.getUsername();
	}
	
	public int getLevel() {
		return level;
	}
	
	public void setLevel(int level) {
		this.level = level;
	}
    
    public PokemonSpecies getSpecies() { return species; }
    public void setSpecies(PokemonSpecies species) { this.species = species; }
    
    public Trainer getOwner() { return owner; }
    
    public void setOwner(Trainer owner) { this.owner = owner; }
	@Override
	public String toString() {
		return "Pokemon [id=" + id + ", name=" + name +"]";
	}

}