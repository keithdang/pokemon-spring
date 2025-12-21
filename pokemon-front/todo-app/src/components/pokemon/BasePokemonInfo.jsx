

export default function BasePokemonInfo({pokemon}) {
    return (
        <div>
            <table className="table">
                   <thead>
                       <tr>
                           <th>Name</th>
                           <th>Level</th>
                           <th>Hp</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr key={pokemon.id}>
                           <td>{pokemon.name}</td>
                           <td>{pokemon.level}</td>
                           <td>{pokemon.currentHp} / {pokemon.maxHp}</td>
                       </tr>
                   </tbody>
               </table>
        </div>
    )
}