import React, { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  retrieveAllComputerPokemon,
  retrieveAllUserPokemon,
  retrieveUserPokemonMoves,
  attack,
  changePokemon,
} from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'
import MovesComponent from './MovesComponent'
import { BasePokemon, Move } from './types' 

export default function Battle() {
  const [pokemon, setPokemon] = useState<BasePokemon[]>([])
  const [cpuPokemon, setCpuPokemon] = useState<BasePokemon[]>([])
  const [battlePokemon, setBattlePokemon] = useState<BasePokemon | null>(null)

  const [message, setMessage] = useState<string | null>(null)
  const [moves, setMoves] = useState<Move[]>([])
  const [battle, setBattle] = useState(false)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [canBattle, setCanBattle] = useState(false)

  const authContext = useAuth()
  const username = authContext.username
  const navigate = useNavigate()

  useEffect(() => refreshPokemon(), [])

function refreshPokemon() {
  if (!username) return;
  retrieveAllUserPokemon(username)
    .then((response: { data: BasePokemon[] }) => {
      const party: BasePokemon[] = response.data;
      setPokemon(party);

      const nextBattlePokemon = party.find(p => 'currentHp' in p && p.currentHp > 0) || null;
      if (nextBattlePokemon) {
        setBattlePokemon(prev => prev && 'currentHp' in prev && prev.currentHp > 0 ? prev : nextBattlePokemon);
        retrieveUserPokemonMoves(username, nextBattlePokemon.id)
          .then((responseMoves: { data: Move[] }) => setMoves(responseMoves.data));
        setCanBattle(true);
      } else {
        setBattlePokemon(null);
        setBattle(false);
        setCanBattle(false);
      }
    })
    .catch((error: any) => console.log(error));

  retrieveAllComputerPokemon()
    .then((response: { data: BasePokemon[] }) => setCpuPokemon(response.data))
    .catch((error: any) => console.log(error));
}

  function getNextBattlePokemon(party: BasePokemon[], faintedId: number) {
    return party.find(p => ('currentHp' in p && p.id !== faintedId && p.currentHp > 0)) || null
  }

  function handleAttack(moveId: number, pokemonId: number, cpuId: number) {
    if (!username) return;
    attack(username, pokemonId, moveId, cpuId)
      .then(response => {
        const { playerPokemon, opponentPokemon, log } = response.data

        setPokemon(prev =>
          prev.map(p => (p.id === playerPokemon.id ? playerPokemon : p))
        )
        setBattlePokemon(playerPokemon)
        setCpuPokemon([opponentPokemon])

        if ('currentHp' in playerPokemon && playerPokemon.currentHp <= 0) {
          setPokemon(prev => {
            const next = getNextBattlePokemon(prev, playerPokemon.id)
            if (next) {
              setBattlePokemon(next)
              retrieveUserPokemonMoves(username, next.id)
                .then(responseMoves => setMoves(responseMoves.data))
            } else {
              setBattle(false)
              setCanBattle(false)
              const noMore = 'No more Pokémon available!'
              setBattleLog(prevLog =>
                prevLog.includes(noMore) ? prevLog : [...prevLog, noMore]
              )
            }
            return prev
          })
        }

        if ('currentHp' in opponentPokemon && opponentPokemon.currentHp <= 0) {
          handleChangePokemon(opponentPokemon.id)
          setBattle(false)
        }

        setBattleLog(log)
      })
      .catch(error => {
        console.log(error)
        setMessage('Game failed')
      })
  }

  function handleChangePokemon(pokemonId: number) {
    changePokemon('computer', pokemonId)
      .then(response => {
        setMessage(response.data?.message ?? 'Change successful!')
        retrieveAllComputerPokemon().then(response => setCpuPokemon(response.data))
      })
      .catch(error => {
        console.log(error)
        setMessage('Change failed')
      })
  }

  return (
    <div className="container battle">
      <div className="header">
        <h1>Battle</h1>
      </div>

      {cpuPokemon && cpuPokemon[0] && (
        <div className="pokemon">
          <h3>CPU:</h3>
          <BasePokemonInfo pokemon={cpuPokemon[0]} />
        </div>
      )}

      {battlePokemon && (
        <div className="pokemon">
          <h3>{username}:</h3>
          <BasePokemonInfo pokemon={battlePokemon} showExp={true} />
        </div>
      )}

      {battle && battlePokemon && cpuPokemon[0] && (
        <div className="pokemon">
          <h2>Moves</h2>
          <MovesComponent
            moves={moves}
            handleAttack={handleAttack}
            attackerId={battlePokemon.id}
            defenderId={cpuPokemon[0].id}
          />
        </div>
      )}

      <div>
        {canBattle && !battle && (
          <button
            className="btn btn-success me-2"
            onClick={() => {
              setBattleLog(['Begin!'])
              setBattle(true)
            }}
          >
            Start
          </button>
        )}
        <button
          className="btn btn-warning"
          onClick={() => {
            setBattleLog([])
            if (cpuPokemon[0]) handleChangePokemon(cpuPokemon[0].id)
          }}
        >
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