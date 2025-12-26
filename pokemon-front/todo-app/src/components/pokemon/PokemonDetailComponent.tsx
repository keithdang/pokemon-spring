import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveSpeciesPokemon, retrieveSpeciesPokemonMoves } from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'
import MovesComponent from './MovesComponent'
import { PokemonSpecies, Move } from './types' // make sure you have these types

export default function PokemonDetailComponent() {
    const { id } = useParams<{ id: string }>()

    const [moves, setMoves] = useState<Move[]>([])
    const [pokemon, setPokemon] = useState<PokemonSpecies | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!id) return

        // Fetch moves
        retrieveSpeciesPokemonMoves(Number(id))
            .then(response => {
                setMoves(response.data)
            })
            .catch(error => console.log(error))

        // Fetch pokemon species
        retrieveSpeciesPokemon(Number(id))
            .then(response => {
                setPokemon(response.data as PokemonSpecies)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading || !pokemon) {
        return <div className="container">Loading...</div>
    }

    return (
        <div className="container">
            <h2>Info</h2>
            <BasePokemonInfo<PokemonSpecies> pokemon={pokemon} mode="species" />
            <h2>Moves</h2>
            <MovesComponent moves={moves} />
        </div>
    )
}

// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useAuth } from '../todo/security/AuthContext'
// import { retrieveSpeciesPokemon, retrieveSpeciesPokemonMoves } from '../todo/api/PokemonApiService'
// import BasePokemonInfo from './BasePokemonInfo'
// import MovesComponent from './MovesComponent'

// export default function PokemonDetailComponent() {

//     const { id } = useParams()

//     const [moves, setMoves] = useState([])
//     const [pokemon, setPokemon] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         retrieveSpeciesPokemonMoves(id)
//             .then(response => {
//                 setMoves(response.data)
//                 setLoading(false)
//             })
//             .catch(error => console.log(error))
        
//         retrieveSpeciesPokemon(id)
//         .then(response => {
//             setPokemon(response.data)
//             setLoading(false)
//         })
//         .catch(error => console.log(error))
//     }, [id])

//     if (loading) {
//         return <div className="container">Loading...</div>
//     }

//     return (
//         <div className="container">
//             <h2>Info</h2>
//             <BasePokemonInfo pokemon={pokemon} mode='species'/>
//             <h2>Moves</h2>
//             <MovesComponent moves={moves} />
//         </div>
//     )
// }
