import { useEffect, useState } from 'react'
import { useAuth } from '../todo/security/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  deletePokemon,
  retrieveAllUserPokemon,
  setActivePokemon
} from '../todo/api/PokemonApiService'
import BasePokemonInfo from './BasePokemonInfo'
import {UserPokemon} from './types'

/* ---- Types ---- */

export default function TrainerPokemonComponent(): JSX.Element{
  const [pokemon, setPokemon] = useState<UserPokemon[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [showDeleted, setShowDeleted] = useState<boolean>(false)

  const authContext = useAuth()
  const username = authContext.username
  const navigate = useNavigate()

  useEffect(() => {
    refreshPokemon()
  }, [])

  function deletePokemonCall(pokemonId: number): void {
    if (!username) return

    deletePokemon(username, pokemonId)
      .then(() => {
        setMessage('Pokemon deleted')
        setShowDeleted(true)
        setTimeout(() => setShowDeleted(false), 1200)
        refreshPokemon()
      })
      .catch(error => console.log(error))
  }

  function refreshPokemon(): void {
    if (!username) return

    retrieveAllUserPokemon(username)
      .then(response => {
        setPokemon(response.data as UserPokemon[])
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="container">
      {showDeleted && (
        <div className="added-popup">
          Deleted
        </div>
      )}

      <h1>Pokemon</h1>

      <BasePokemonInfo
        pokemon={pokemon}
        mode="user"
        showExp
        actions={(pokemonOb: UserPokemon) => (
          <>
            <button
              className="btn btn-info me-2"
              onClick={() => navigate(`/trainerpokemon/${pokemonOb.id}`)}
            >
              View
            </button>

            <button
              className="btn btn-warning me-2"
              onClick={() => deletePokemonCall(pokemonOb.id)}
            >
              Delete
            </button>

            {pokemonOb.partyOrder !== 0 && (
              <button
                className="btn btn-success"
                onClick={() => {
                  if (!username) return

                  setActivePokemon(username, pokemonOb.id)
                    .then(response => {
                      const sorted = [...response.data].sort(
                        (a: UserPokemon, b: UserPokemon) =>
                          a.partyOrder! - b.partyOrder!
                      )
                      setPokemon(sorted)
                    })
                    .catch(error => console.log(error))
                }}
              >
                Set 1st
              </button>
            )}
          </>
        )}
      />
    </div>
  )
}


// import { useEffect, useState } from 'react'
// import { useAuth } from '../todo/security/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import { deletePokemon, retrieveAllUserPokemon, setActivePokemon } from '../todo/api/PokemonApiService'
// import {TYPE_COLORS} from './TYPE_COLOURS'
// import BasePokemonInfo from './BasePokemonInfo'

// export default function TrainerPokemonComponent() {
//     const [pokemon,setPokemon] = useState([])

//     const [message,setMessage] = useState(null)
//     const authContext = useAuth()
//     const username = authContext.username
//     const [showDeleted, setShowDeleted] = useState(false)
//     const navigate = useNavigate()

//     useEffect ( () => refreshPokemon(), [])

//     function deletePokemonCall(pokemonOb) {
//         deletePokemon(username, pokemonOb)
//             .then(() => {
//                 setMessage("Pokemon delete")
//                 setShowDeleted(true)
//                 setTimeout(() => setShowDeleted(false), 1200)
//                 refreshPokemon()
//             })
//             .catch(error => console.log(error))
//     }

//     function refreshPokemon() {
        
//         retrieveAllUserPokemon(username)
//         .then(response => {
//             setPokemon(response.data)
//         }
            
//         )
//         .catch(error => console.log(error))
    
//     }
//     return (
//     <div className="container">
//         {showDeleted && (
//             <div className="added-popup">
//                 Deleted
//             </div>
//         )}
//         <h1>Pokemon </h1>
//             <div>
//            <BasePokemonInfo
//                 pokemon={pokemon}
//                 mode="user"
//                 showExp
//                 actions={pokemonOb => (
//                 <>
//                     <button
//                     className="btn btn-info me-2"
//                     onClick={() => navigate(`/trainerpokemon/${pokemonOb.id}`)}
//                     >
//                     View
//                     </button>
//                     <button className="btn btn-warning me-2" 
//                         onClick={() => deletePokemonCall(pokemonOb.id)}>Delete</button> 
//                         {pokemonOb.partyOrder !== 0 &&  <button
//                             className="btn btn-success"
//                             onClick={() =>     
//                                 setActivePokemon(username, pokemonOb.id)
//                                 .then(response => {
//                                     setPokemon([...response.data].sort((a, b) => a.partyOrder - b.partyOrder))
//                                 })
//                                 .catch(error => console.log(error))}
//                         >
//                         Set 1st
//                     </button>}
//                 </>
//                 )}
//             />
            
//             </div>
//         </div>
//     )
// }