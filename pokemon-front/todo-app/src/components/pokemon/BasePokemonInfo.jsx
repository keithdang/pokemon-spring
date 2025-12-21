

export default function BasePokemonInfo({pokemon, ifUser = false}) {
    return (
        <div>
            <table className="table">
                   <thead>
                       <tr>
                           <th>Name</th>
                           <th>Level</th>
                           <th>Hp</th>
                           {ifUser && <th>Exp</th>}
                       </tr>
                   </thead>
                   <tbody>
                       <tr key={pokemon.id}>
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