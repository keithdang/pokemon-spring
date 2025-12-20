import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../todo/security/AuthContext'
import { retrieveSpeciesPokemon, retrieveSpeciesPokemonMoves } from '../todo/api/PokemonApiService'

export default function PokemonDetailComponent() {

    const { id } = useParams()

    const [moves, setMoves] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        retrieveSpeciesPokemonMoves(id)
            .then(response => {
                setMoves(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        
        retrieveSpeciesPokemon(id)
        .then(response => {
            setPokemon(response.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [id])

    if (loading) {
        return <div className="container">Loading...</div>
    }

    return (
        <div className="container">
            <h3>{pokemon.name}</h3>
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
