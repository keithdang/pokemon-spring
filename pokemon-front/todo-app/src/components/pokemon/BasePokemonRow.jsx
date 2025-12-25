import { TYPE_COLORS } from './TYPE_COLOURS'

export default function BasePokemonRow({
  pokemon,
  mode = 'user',
  showExp = false,
  actions
}) {
  if (!pokemon) return null
  if (mode === 'user' && !pokemon.species) return null
    console.log(pokemon)
  const id = mode === 'species' ? pokemon.id : pokemon.species.id
  const types = mode === 'species' ? pokemon.types : pokemon.species.types

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
        {types.map(type => (
          <span
            key={type}
            className="type-badge"
            style={{ backgroundColor: TYPE_COLORS[type] || '#999' }}
          >
            {type}
          </span>
        ))}
      </td>

      {mode === 'user' && (
        <>
          <td>{pokemon.currentHp}/{pokemon.maxHp}</td>
          <td>{pokemon.level}</td>
        </>
      )}
     {showExp && (
        <td>{pokemon.currentXp} / {pokemon.xpToNextLevel}</td>
      )}
      {actions && <td>{actions(pokemon)}</td>}
    </tr>
  )
}
