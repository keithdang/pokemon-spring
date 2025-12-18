package com.spring.pokemon.species;


import java.util.EnumSet;
import java.util.Set;

import com.spring.pokemon.characters.ElementType;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class PokemonSpecies {
	@Id
	@GeneratedValue
	private Integer id;

	private String name;

    @ElementCollection(targetClass = ElementType.class)
    @Enumerated(EnumType.STRING)
    private Set<ElementType> types = EnumSet.noneOf(ElementType.class);
	
	public PokemonSpecies() {
	}
	
	public PokemonSpecies(String name, ElementType primary, ElementType secondary) {
        this.name = name;
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

}