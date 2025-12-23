import { apiClient } from './ApiClient'

export const retrieveAllPokemon
    = () => apiClient.get(`/pokemonspecies`)

export const retrieveSpeciesPokemon
    = (id) => apiClient.get(`/pokemonspecies/${id}`)

export const retrieveAllUserPokemon
    = (username) => apiClient.get(`/users/${username}/pokemon`)

export const retrieveAllComputerPokemon
    = () => apiClient.get(`/users/computer/pokemon`)

export const retrieveUserPokemon
    = (username, pokemon) => apiClient.get(`/users/${username}/pokemon/${pokemon}`)

export const addPokemonToTrainer
    = (username,  pokemon) => apiClient.post(`/users/${username}/pokemon`, pokemon)

export const deletePokemon
    = (username,  id) => apiClient.delete(`/users/${username}/pokemon/${id}`)

export const retrieveUserPokemonMoves
    = (username, pokemon) => apiClient.get(`/users/${username}/pokemon/${pokemon}/moves`)

export const retrieveSpeciesPokemonMoves
    = (id) => apiClient.get(`/pokemonspecies/${id}/moves`)

export const attack
    = (username, pokemon, moveId, opponentPokemon) => apiClient.put(`/users/${username}/pokemon/${pokemon}/moves/${moveId}/opp/${opponentPokemon}`)

export const changePokemon 
    = (username, pokemon) => apiClient.put(`users/${username}/pokemon/${pokemon}/change`)

export const setActivePokemon =
    (username, pokemonId) =>
        apiClient.put(`/users/${username}/pokemon/${pokemonId}/set-active`)

export const heal 
    = (username, pokemon) => apiClient.put(`/users/${username}/pokemon/${pokemon}/heal`)