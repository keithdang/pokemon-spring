import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../todo/security/AuthContext';
import { retrieveAllPokemon, addPokemonToTrainer } from '../todo/api/PokemonApiService';
import BasePokemonInfo from './BasePokemonInfo';
import { BasePokemon, PokemonSpecies } from './types';
import './pokemon.css';

export default function PokemonComponent() {
  const [pokemon, setPokemon] = useState<PokemonSpecies[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [showAdded, setShowAdded] = useState<boolean>(false);

  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  // Fetch all Pokemon from API
  useEffect(() => {
    refreshPokemon();
  }, []);

  function refreshPokemon() {
    retrieveAllPokemon()
      .then((response) => setPokemon(response.data as PokemonSpecies[]))
      .catch((error) => console.log(error));
  }

  function handleAddPokemon(pokemonOb: PokemonSpecies) {
    const requestBody = {
      speciesId: pokemonOb.id,
      name: pokemonOb.name,
      level: 1,
    };
    if(!username) return
    addPokemonToTrainer(username, requestBody)
      .then(() => {
        setMessage('Pokemon added successfully');
        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 1200);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      {showAdded && (
        <div className="added-popup">
          Added ✅
        </div>
      )}
      <h1>Pokemon</h1>
      <div>
        <BasePokemonInfo<PokemonSpecies>
          pokemon={pokemon}
          mode="species"
          actions={(pokemonOb: PokemonSpecies) => (
            <>
              <button
                className="btn btn-info me-2"
                onClick={() => navigate(`/speciespokemon/${pokemonOb.id}`)}
              >
                View
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleAddPokemon(pokemonOb)}
              >
                Add
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react'
// import { useAuth } from '../todo/security/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import { retrieveAllPokemon, addPokemonToTrainer } from '../todo/api/PokemonApiService'
// import BasePokemonInfo from './BasePokemonInfo'
// import './pokemon.css';
// import {TYPE_COLORS} from './TYPE_COLOURS'

// export default function PokemonComponent() {
//     const [pokemon,setPokemon] = useState([])

//     const authContext = useAuth()
//     const username = authContext.username
//     const [message,setMessage] = useState(null)
//     const [showAdded, setShowAdded] = useState(false)
//     const navigate = useNavigate()    

//     function handleAddPokemon(pokemonOb) {
//         const requestBody = {
//             speciesId: pokemonOb.id, 
//             name: pokemonOb.name,
//             level: 1
//         }
//         addPokemonToTrainer(username, requestBody)
//             .then(() => {
//                 setMessage("Pokemon added successfully")
//                 setShowAdded(true)
//                 setTimeout(() => setShowAdded(false), 1200)
//             })
//             .catch(error => console.log(error))
//     }

//     useEffect ( () => refreshPokemon(), [])

//     function refreshPokemon() {
        
//         retrieveAllPokemon()
//         .then(response => {
//             setPokemon(response.data)
//         }
            
//         )
//         .catch(error => console.log(error))
    
//     }

//     return (
//     <div className="container">
//         {showAdded && (
//             <div className="added-popup">
//                 Added ✅
//             </div>
//         )}
//         <h1>Pokemon </h1>
//             <div>
//                 <BasePokemonInfo
//                             pokemon={pokemon}
//                             mode = 'species'
//                             actions={pokemonOb => (
//                             <>
//                                 <button
//                                     className="btn btn-info me-2"
//                                     onClick={() => navigate(`/speciespokemon/${pokemonOb.id}`)}
//                                 >
//                                     View
//                                 </button>
//                                     <button 
//                                         className="btn btn-success"
//                                         onClick={() => handleAddPokemon(pokemonOb)}>
//                                         Add
//                                     </button>
//                             </>)}
//                             />
//             </div>
//         </div>
//     )
// }