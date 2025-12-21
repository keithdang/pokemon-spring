import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import { retrieveAllComputerPokemon, 
    retrieveAllUserPokemon,
    retrieveUserPokemonMoves,
    attack,
    cpuAttack
} from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'

export default function Battle() {
    const [pokemon,setPokemon] = useState([])
    const [cpuPokemon,setCpuPokemon] = useState([])

    const [message,setMessage] = useState(null)
    const [moves, setMoves] = useState([])
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    useEffect ( () => refreshPokemon(), [])

    function refreshPokemon() {
        
        retrieveAllUserPokemon(username)
        .then(response => {
            setPokemon(response.data)
            retrieveUserPokemonMoves(username, response.data[0].id)
                .then(responseMoves => {
                    setMoves(responseMoves.data)
                    // setLoading(false)
                })
                .catch(error => console.log(error))
        }
            
        )
        .catch(error => console.log(error))

        retrieveAllComputerPokemon()
        .then(response => {
            setCpuPokemon(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function handleAttack(moveId, pokemonId, cpuId) {
        attack(username, pokemonId, moveId, cpuId)
        .then(response => {
            setMessage(response.data?.message ?? "Attack successful!");
            // cpuAttack(pokemonId, moveId, cpuId).then(response2 => {
            //     refreshPokemon();  
            // })
            refreshPokemon();  
        })
        .catch(error => {
            console.log(error);
            setMessage("Attack failed");
        });
}
   return (
        <div className="container">
            <h1>Battle</h1>
            {cpuPokemon && cpuPokemon[0] &&
            <div>
                <h3>CPU:</h3>
                <BasePokemonInfo pokemon={cpuPokemon[0]}/>
            </div>
            }
            {pokemon && pokemon[0] &&
            <div>
                <h3>You:</h3>
                <BasePokemonInfo pokemon={pokemon[0]}/>
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
                                   <td>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => handleAttack(move.id,pokemon[0].id, cpuPokemon[0].id)}
                                        >
                                            {move.name}
                                        </button>
                                   </td>
                                   <td>{move.damage}</td>
                                   <td>{move.type}</td>
                               </tr>
                           ))}
                       </tbody>
                   </table></div>
        }
        </div>
   )
}