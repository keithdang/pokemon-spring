package com.spring.pokemon.characters;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public enum ElementType {
    NORMAL,
    FIRE,
    WATER,
    GRASS,
    ELECTRIC,
    ICE,
    FIGHTING,
    POISON,
    GROUND,
    FLYING,
    PSYCHIC,
    BUG,
    ROCK,
    GHOST,
    DRAGON,
    DARK,
    STEEL,
    FAIRY
}
//@Entity
//public class ElementType {
//	public ElementType() {
//		
//	}
//	public ElementType(Integer id, String element) {
//		super();
//		this.id = id;
//		this.element = element;
//	}
//	
//	@Id
//	@GeneratedValue
//	private Integer id;
//
//	private String element;
//}
