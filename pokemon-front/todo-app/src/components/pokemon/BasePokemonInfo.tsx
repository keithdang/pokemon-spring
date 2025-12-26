import React from 'react'
import BasePokemonRow from './BasePokemonRow'
import { BasePokemon } from './types' // assume you have your types exported from a types file

type BasePokemonInfoProps = {
  pokemon: BasePokemon | BasePokemon[]
  mode?: 'user' | 'species'
  showExp?: boolean
  actions?: (pokemon: BasePokemon) => React.ReactNode
}

export default function BasePokemonInfo({
  pokemon,
  mode = 'user',
  showExp = false,
  actions
}: BasePokemonInfoProps) {
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
