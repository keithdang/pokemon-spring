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
    const [battlePokemon, setBattlePokemon] = useState(null)


    const [message,setMessage] = useState(null)
    const [moves, setMoves] = useState([])
    const [battle, setBattle] = useState(false)
    const [battleLog, setBattleLog] = useState([])
    const [canBattle, setCanBattle] = useState(false)
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    useEffect ( () => refreshPokemon(), [])

    function refreshPokemon() {
        
        retrieveAllUserPokemon(username)
        .then(response => {
            const party = response.data
            setPokemon(party)
                  // 👇 find first usable Pokémon
            const nextBattlePokemon =
                party.find(p => p.currentHp > 0) || null

            if (nextBattlePokemon) {
                setBattlePokemon(prev =>
                    prev && prev.currentHp > 0
                        ? prev
                        : nextBattlePokemon
                )

                retrieveUserPokemonMoves(username, nextBattlePokemon.id)
                    .then(responseMoves => {
                        setMoves(responseMoves.data)
                    })
                setCanBattle(true)
            } else {
                // No usable Pokémon left
                setBattlePokemon(null)
                setBattle(false)
                setCanBattle(false)
            }
        }
            
        )
        .catch(error => console.log(error))

        retrieveAllComputerPokemon()
            .then(response => {
                setCpuPokemon(response.data)
            })
        .catch(error => console.log(error))
    
    }
    function getNextBattlePokemon(party, faintedId) {
        console.log("getNextBattlePokemon");
        console.log(party);
        return party.find(p => p.id !== faintedId && p.currentHp > 0) || null
    }
    function handleAttack(moveId, pokemonId, cpuId) {
        attack(username, pokemonId, moveId, cpuId)
                .then(response => {
                        const { playerPokemon, opponentPokemon, log } = response.data

                    // setPokemon([playerPokemon])
                    
                    setPokemon(prev =>
                        prev.map(p =>
                            p.id === playerPokemon.id ? playerPokemon : p
                        )
                    )
                    setBattlePokemon(playerPokemon)
                    setCpuPokemon([opponentPokemon])

                    if (playerPokemon.currentHp <= 0) {
                        setPokemon(prev => {
                            const next = getNextBattlePokemon(prev, playerPokemon.id)
                            if (next) {
                                setBattlePokemon(next)
                                retrieveUserPokemonMoves(username, next.id)
                                    .then(responseMoves => {
                                    setMoves(responseMoves.data)
                                })
                            } else {
                                setBattle(false) // no Pokémon left
                                setCanBattle(false)
                                var noMore = "No more Pokémon available!";
                                setBattleLog(prevLog =>
                                    prevLog.includes(noMore)
                                        ? prevLog
                                        : [...prevLog, noMore]
                                )
                            }
                            return prev
                        })
                    }
                    if(opponentPokemon.currentHp <= 0){
                        handleChangePokemon(opponentPokemon.id)
                        setBattle(false)
                    }

                    setBattleLog(log)
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
            retrieveAllComputerPokemon()
            .then(response => {
                setCpuPokemon(response.data)
            })
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
            {battlePokemon && 
                <div>
                    <h3>You:</h3>
                    <BasePokemonInfo pokemon={battlePokemon} ifUser ={true}/>
                </div>
            }
            {battle && battlePokemon &&
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
                                                        onClick={() => handleAttack(move.id,battlePokemon.id, cpuPokemon[0].id)}
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
                    }:
            <div>
                {canBattle && !battle &&
                <button onClick={() => {
                    setBattleLog(["Begin!"])
                    setBattle(true)
                    }}>
                    Start
                </button>
}
                <button onClick={() => 
                    {
                        setBattleLog([])
                        handleChangePokemon(cpuPokemon[0].id)
                    }}>
                    New Opponent
                </button>
            </div>
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