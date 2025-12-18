import { useEffect, useState } from 'react'
import { retrieveAllPokemon } from '../todo/api/PokemonApiService'
export default function PokemonComponent() {
    const [pokemon,setPokemon] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshPokemon(), [])

    function refreshPokemon() {
        
        retrieveAllPokemon()
        .then(response => {
            setPokemon(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }
    return (
    <div className="container">
        <h1>Pokemon </h1>
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        pokemon.map(
                            pokemonOb => (
                                <tr key={pokemonOb.id}>
                                    <td>{pokemonOb.id}</td>
                                    <td>{pokemonOb.name}</td>
                                    <td>{pokemonOb.types.join(" / ")}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        </div>
    )
}