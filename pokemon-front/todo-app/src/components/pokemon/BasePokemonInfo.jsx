import {TYPE_COLORS} from './TYPE_COLOURS'

import BasePokemonRow from './BasePokemonRow'

export default function BasePokemonInfo({
  pokemon,
  mode = 'user',
  showExp = false,
  actions
}) {
  if (!pokemon) return null

console.log(actions)
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
