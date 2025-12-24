

export default function BasePokemonInfo({pokemon, ifUser = false}) {
    return (
        <div>
            <table className="table">
                   <thead>
                       <tr>
                            <th>Image</th>
                           <th>Name</th>
                           <th>Level</th>
                           <th>Hp</th>
                           {ifUser && <th>Exp</th>}
                       </tr>
                   </thead>
                   <tbody>
                       <tr key={pokemon.id}>
                           <td>
                                <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.species.id}.png`}
                                alt={pokemon.name}
                                />
                            </td>
                           <td>{pokemon.name}</td>
                           <td>{pokemon.level}</td>
                           <td>{pokemon.currentHp} / {pokemon.maxHp}</td>
                           {ifUser && <td>{pokemon.currentXp} / {pokemon.xpToNextLevel}</td>}
                       </tr>
                   </tbody>
               </table>
        </div>
    )
}