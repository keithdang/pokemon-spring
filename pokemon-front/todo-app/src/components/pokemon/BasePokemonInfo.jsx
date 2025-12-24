import {TYPE_COLORS} from './TYPE_COLOURS'

export default function BasePokemonInfo({pokemon, ifUser = false, ifSpecies = false}) {
    if (!pokemon) return null
    if (!ifSpecies && !pokemon.species) return null
    
    var id= ifSpecies ? pokemon.id : pokemon.species.id
    var types= ifSpecies ? pokemon.types : pokemon.species.types
    return (
        <div>
            <table className="table">
                   <thead>
                       <tr>
                            <th>Image</th>
                           <th>Name</th>
                           <th>Type</th>
                           {!ifSpecies &&
                           <>
                           <th>Level</th>
                           <th>Hp</th>
                           </>
                            }
                           {ifUser && <th>Exp</th>}
                       </tr>
                   </thead>
                   <tbody>
                       <tr key={id}>
                           <td>
                                {id && <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                alt={pokemon.name}
                                />}

                            </td>
                           <td>{pokemon.name}</td>
                            <td>
                                {types && types.map(type => (
                                <span
                                    key={type}
                                    className="type-badge"
                                    style={{ backgroundColor: TYPE_COLORS[type] || '#999' }}
                                >
                                    {type}
                                </span>
                                ))}
                            </td>
                            {!ifSpecies &&
                                <>
                                <td>{pokemon.level}</td>
                                <td>{pokemon.currentHp} / {pokemon.maxHp}</td>
                                </>
                            }
                           {ifUser && <td>{pokemon.currentXp} / {pokemon.xpToNextLevel}</td>}
                       </tr>
                   </tbody>
               </table>
        </div>
    )
}