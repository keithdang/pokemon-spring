package com.spring.pokemon.moves;


import com.spring.pokemon.characters.ElementType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
		  uniqueConstraints = @UniqueConstraint(columnNames = "name")
		)
public class Move {
	@Id
	@GeneratedValue
	private Integer id;

	private String name;
	
	private Integer damage;

//    @ElementCollection(targetClass = ElementType.class)
    @Enumerated(EnumType.STRING)
    private ElementType elementType;
	
	public Move() {
	}
	
	public Move(String name, ElementType elementType, int damage) {
        this.name = name;
        this.elementType = elementType;
        this.damage = damage;
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
	
    public ElementType getType() {
        return elementType;
    }
    
    public void setType(ElementType elementType) {
//        this.elementType = ElementType.valueOf(elementType.toUpperCase());
    	this.elementType = elementType;
    }
    
	public Integer getDamage() {
		return damage;
	}

	public void setDamage(Integer damage) {
		this.damage = damage;
	}
	@Override
	public String toString() {
		return "Move [id=" + id + ", name=" + name +"]";
	}

}