import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deletePokemon, retrieveAllUserPokemon, setActivePokemon, heal } from '../todo/api/PokemonApiService'
export default function TrainerPokemonComponent() {
    const [pokemon,setPokemon] = useState([])

    const [message,setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const [showDeleted, setShowDeleted] = useState(false)
    const navigate = useNavigate()

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
        
        retrieveAllUserPokemon(username)
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
                                <th>Image</th>
                                <th>Name</th>
                                <th>Health</th>
                                <th>Level</th>
                                <th>View</th>
                                <th>Delete</th>
                                <th>Order</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        pokemon.map(
                            pokemonOb => (
                                <tr key={pokemonOb.id}>
                                    <td>
                                        <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonOb.species.id}.png`}
                                        alt={pokemonOb.name}
                                        />
                                    </td>
                                    <td>{pokemonOb.name}</td>
                                    <td>{pokemonOb.currentHp}/{pokemonOb.maxHp}</td>
                                    <td>{pokemonOb.level}</td>
                                    <td>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => navigate(`/trainerpokemon/${pokemonOb.id}`)}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deletePokemonCall(pokemonOb.id)}>Delete</button> </td>
                                    <td>
                                       {pokemonOb.partyOrder !== 0 &&  <button
                                            className="btn btn-success"
                                            onClick={() =>     
                                                setActivePokemon(username, pokemonOb.id)
                                                .then(response => {
                                                    setPokemon([...response.data].sort((a, b) => a.partyOrder - b.partyOrder))
                                                })
                                                .catch(error => console.log(error))}
                                        >
                                            Set 1st
                                        </button>}
                                    </td>
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