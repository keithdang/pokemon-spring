import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../todo/security/AuthContext'
import { retrieveSpeciesPokemon, retrieveSpeciesPokemonMoves } from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'
import MovesComponent from './MovesComponent'

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
            <h2>Info</h2>
            <BasePokemonInfo pokemon={pokemon} mode='species'/>
            <h2>Moves</h2>
            <MovesComponent moves={moves} />
        </div>
    )
}
