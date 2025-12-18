import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { retrieveAllPokemon, retrieveUserPokemon } from '../todo/api/PokemonApiService'
export default function TrainerPokemonComponent() {
    const [pokemon,setPokemon] = useState([])

    const [message,setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    useEffect ( () => refreshPokemon(), [])

    function refreshPokemon() {
        
        retrieveUserPokemon(username)
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
                                <th>Level</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        pokemon.map(
                            pokemonOb => (
                                <tr key={pokemonOb.id}>
                                    <td>{pokemonOb.id}</td>
                                    <td>{pokemonOb.name}</td>
                                    <td>{pokemonOb.level}</td>
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