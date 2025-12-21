import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../todo/security/AuthContext'
import { retrieveUserPokemonMoves, retrieveUserPokemon } from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'

export default function TrainerPokemonDetailComponent() {

    const { id } = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const [moves, setMoves] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        retrieveUserPokemonMoves(username, id)
            .then(response => {
                setMoves(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        
        retrieveUserPokemon(username, id)
        .then(response => {
            setPokemon(response.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [id, username])

    if (loading) {
        return <div className="container">Loading...</div>
    }

    return (
        <div className="container">
            <h2>Info</h2>
            <BasePokemonInfo pokemon={pokemon} ifUser ={true}/>
            <h2>Moves</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Power</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.map(move => (
                        <tr key={move.id}>
                            <td>{move.name}</td>
                            <td>{move.damage}</td>
                            <td>{move.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
