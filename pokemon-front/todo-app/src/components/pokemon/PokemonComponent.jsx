import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import { retrieveAllPokemon, addPokemonToTrainer } from '../todo/api/PokemonApiService'
import './pokemon.css';
export default function PokemonComponent() {
    const [pokemon,setPokemon] = useState([])

    const authContext = useAuth()
    const username = authContext.username
    const [message,setMessage] = useState(null)
    const [showAdded, setShowAdded] = useState(false)
    const navigate = useNavigate()    

    function handleAddPokemon(pokemonOb) {
        const requestBody = {
            speciesId: pokemonOb.id, 
            name: pokemonOb.name,
            level: 1
        }
        addPokemonToTrainer(username, requestBody)
            .then(() => {
                setMessage("Pokemon added successfully")
                setShowAdded(true)
                setTimeout(() => setShowAdded(false), 1200)
            })
            .catch(error => console.log(error))
    }

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
        {showAdded && (
            <div className="added-popup">
                Added ✅
            </div>
        )}
        <h1>Pokemon </h1>
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>View</th>
                                <th>Add</th>
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
                                                                        <td>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => navigate(`/speciespokemon/${pokemonOb.id}`)}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleAddPokemon(pokemonOb)}>
                                            Add
                                        </button>
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