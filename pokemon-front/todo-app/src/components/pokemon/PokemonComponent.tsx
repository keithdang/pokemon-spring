import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../todo/security/AuthContext';
import { retrieveAllPokemon, addPokemonToTrainer,retrieveAllUserPokemon } from '../todo/api/PokemonApiService';
import BasePokemonInfo from './BasePokemonInfo';
import { BasePokemon, PokemonSpecies } from './types';
import './pokemon.css';

export default function PokemonComponent() {
  const [pokemon, setPokemon] = useState<PokemonSpecies[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [partySize, setPartySize] = useState<number>(0);


  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  // Fetch all Pokemon from API
  useEffect(() => {
    refreshPokemon();
    refreshPartySize();
  }, []);

  function refreshPokemon() {
    retrieveAllPokemon()
      .then((response) => setPokemon(response.data as PokemonSpecies[]))
      .catch((error) => console.log(error));
  }

  function refreshPartySize() {
  if (!username) return;

  retrieveAllUserPokemon(username)
    .then(res => setPartySize(res.data.length))
    .catch(console.error);
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
        setMessage('Added ✅');
        setShowMsg(true);
        setIsError(false);
        setPartySize(prev => prev + 1);
        setTimeout(() => setShowMsg(false), 1200);
      })
      .catch((error) => 
        {
        setMessage(error?.response?.data?.message ?? 'Failed to add Pokémon')
        setShowMsg(true);
        setIsError(true);
        setTimeout(() => setShowMsg(false), 1200);
      }
    );
  }

  return (
    <div className="container">
      {showMsg && (
        <div className={`added-popup ${isError ? 'error' : 'success'}`}>
          {message}
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
                disabled={partySize >= 6}
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
