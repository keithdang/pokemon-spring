import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { deletePokemon, retrieveUserPokemon } from '../todo/api/PokemonApiService'
export default function TrainerPokemonComponent() {
    const [pokemon,setPokemon] = useState([])

    const [message,setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const [showDeleted, setShowDeleted] = useState(false)

    useEffect ( () => refreshPokemon(), [])

    function deletePokemonCall(pokemonOb) {
        deletePokemon(username, pokemonOb)
            .then(() => {
                setMessage("Pokemon delete")
                setShowDeleted(true)
                setTimeout(() => setShowDeleted(false), 1200)
                refreshPokemon()
            })
            .catch(error => console.log(error))
    }

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
        {showDeleted && (
            <div className="added-popup">
                Deleted
            </div>
        )}
        <h1>Pokemon </h1>
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Options</th>
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
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deletePokemonCall(pokemonOb.id)}>Delete</button> </td>
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