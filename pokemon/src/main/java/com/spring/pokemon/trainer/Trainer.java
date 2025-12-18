package com.spring.pokemon.trainer;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.pokemon.characters.Pokemon;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Trainer {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Pokemon> pokemon = new ArrayList<>();

    protected Trainer() {}

    public Trainer(String username) {
        this.username = username;
    }

    public void addPokemon(Pokemon p) {
//        p.setOwner(this);
        pokemon.add(p);
    }

    public String getUsername() {
        return username;
    }

    public List<Pokemon> getPokemon() {
        return pokemon;
    }
}