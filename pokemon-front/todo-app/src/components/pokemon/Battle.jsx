import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import { retrieveAllComputerPokemon, 
    retrieveAllUserPokemon,
    retrieveUserPokemonMoves,
    attack,
    changePokemon
} from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'

export default function Battle() {
    const [pokemon,setPokemon] = useState([])
    const [cpuPokemon,setCpuPokemon] = useState([])

    const [message,setMessage] = useState(null)
    const [moves, setMoves] = useState([])
    const [battle, setBattle] = useState(false)
    const [battleLog, setBattleLog] = useState([])
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
                        const { playerPokemon, opponentPokemon, log } = response.data

                    setPokemon([playerPokemon])
                    setCpuPokemon([opponentPokemon])
                    setBattleLog(log)

                    if (playerPokemon.currentHp <= 0 || opponentPokemon.currentHp <= 0) {
                        setBattle(false)
                    }
                    if(opponentPokemon.currentHp <= 0){
                        handleChangePokemon(opponentPokemon.id)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setMessage("Game failed")
                })
    }
        function handleChangePokemon(pokemonId) {
        changePokemon("computer", pokemonId)
        .then(response => {
            setMessage(response.data?.message ?? "Change successful!");
            refreshPokemon();  
        })
        .catch(error => {
            console.log(error);
            setMessage("Change failed");
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
                    <BasePokemonInfo pokemon={pokemon[0]} ifUser ={true}/>
                </div>
            }
            {battle ? 
            <div>
                {pokemon && pokemon[0] &&
                        <div>
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
            </div>:
            <div>
                <button onClick={() => {
                    setBattleLog(["Begin!"])
                    setBattle(true)}}>
                    Start
                </button>
                <button onClick={() => 
                    {
                        setBattleLog([])
                        handleChangePokemon(cpuPokemon[0].id)
                    }}>
                    New Opponent
                </button>
            </div>
            }
            <ul className="list-group">
                {battleLog.map((line, index) => (
                    <li key={index} className="list-group-item">
                        {line}
                    </li>
                ))}
            </ul>
        </div>
   )
}