package com.spring.pokemon.moves;

import org.springframework.stereotype.Service;

import com.spring.pokemon.characters.ElementType;
import com.spring.pokemon.moves.repository.MoveRepository;

@Service
public class MoveService {
	private final MoveRepository moveRepository;
	
	public MoveService(MoveRepository moveRepository) {
		this.moveRepository = moveRepository;
	}
	
    public Move createMoveIfMissing(String name, int damage, ElementType type) {
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