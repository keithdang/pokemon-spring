package com.spring.pokemon.species;


import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

import com.spring.pokemon.characters.ElementType;
import com.spring.pokemon.moves.Move;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class PokemonSpecies {
	@Id
//	@GeneratedValue
	private Integer id;

	private String name;

	private Integer baseHp;
	
    @ElementCollection(targetClass = ElementType.class)
    @Enumerated(EnumType.STRING)
    private Set<ElementType> types = EnumSet.noneOf(ElementType.class);
    
    @ManyToMany
    @JoinTable(
        name = "species_moves",
        joinColumns = @JoinColumn(name = "species_id"),
        inverseJoinColumns = @JoinColumn(name = "move_id")
    )
    private Set<Move> learnableMoves = new HashSet<>();

    public Set<Move> getLearnableMoves() {
        return learnableMoves;
    }
	
	public PokemonSpecies() {
	}
	
	public PokemonSpecies(String name, ElementType primary, ElementType secondary, Integer baseHp) {
        this.name = name;
        this.baseHp = baseHp;
        this.types.add(primary);
        if (secondary != null) {
            this.types.add(secondary);
        }
    }



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
	
    public Set<ElementType> getTypes() {
        return types;
    }
    

	@Override
	public String toString() {
		return "Pokemon [id=" + id + ", name=" + name +"]";
	}

	public Integer getBaseHp() {
		return baseHp;
	}

	public void setBaseHp(Integer baseHp) {
		this.baseHp = baseHp;
	}

}