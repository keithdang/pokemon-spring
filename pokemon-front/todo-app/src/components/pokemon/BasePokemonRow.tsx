import { TYPE_COLORS, PokemonType } from './TYPE_COLOURS'
import {BasePokemonRowProps, BasePokemon, UserPokemon} from './types'
import React from 'react'

function isUserPokemon(pokemon: BasePokemon): pokemon is UserPokemon {
  return 'species' in pokemon
}

export default function BasePokemonRow({
  pokemon,
  mode = 'user',
  showExp = false,
  actions
}: BasePokemonRowProps) {
  if (!pokemon) return null
  if (mode === 'user' && !('species' in pokemon)) return null
  console.log(pokemon)
  const id = isUserPokemon(pokemon)
    ? pokemon.species.id
    : pokemon.id

  const types = isUserPokemon(pokemon)
    ? pokemon.species.types
    : pokemon.types

  return (
    <tr>
      <td>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name}
        />
      </td>

      <td>{pokemon.name}</td>

      <td>
        {types.map(type => {
          const key = type.toUpperCase() as PokemonType

          return (
            <span
              key={type}
              className="type-badge"
              style={{ backgroundColor: TYPE_COLORS[key] ?? '#999' }}
            >
              {type}
            </span>
          )
        })}
      </td>

      {mode === 'user' && 'species' in pokemon && (
        <>
          <td>{pokemon.level}</td>
          <td>{pokemon.currentHp}/{pokemon.maxHp}</td>
        </>
      )}

      {showExp && 'currentXp' in pokemon && (
        <td>
          {pokemon.currentXp} / {pokemon.xpToNextLevel}
        </td>
      )}

      {actions && <td>{actions(pokemon)}</td>}
    </tr>
  )
}
