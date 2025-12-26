import React from 'react'
import BasePokemonRow from './BasePokemonRow'
import { BasePokemon, BasePokemonInfoProps } from './types' // assume you have your types exported from a types file


export default function BasePokemonInfo<T extends BasePokemon>({
  pokemon,
  mode = 'user',
  showExp = false,
  actions
}: BasePokemonInfoProps<T>) {
  if (!pokemon) return null

  const pokemonList = Array.isArray(pokemon) ? pokemon : [pokemon]

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Type</th>

          {mode === 'user' && (
            <>
              <th>Level</th>
              <th>HP</th>
            </>
          )}

          {showExp && <th>EXP</th>}

          {actions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {pokemonList.map(p => (
          <BasePokemonRow
            key={p.id}
            pokemon={p}
            mode={mode}
            showExp={showExp}
            actions={actions}
          />
        ))}
      </tbody>
    </table>
  )
}
