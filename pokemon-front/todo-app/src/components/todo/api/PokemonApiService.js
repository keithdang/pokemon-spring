import { apiClient } from './ApiClient'

export const retrieveAllPokemon
    = () => apiClient.get(`/pokemonspecies`)


export const retrieveAllUserPokemon
    = (username) => apiClient.get(`/users/${username}/pokemon`)

export const retrieveUserPokemon
    = (username, pokemon) => apiClient.get(`/users/${username}/pokemon/${pokemon}`)

export const addPokemonToTrainer
    = (username,  pokemon) => apiClient.post(`/users/${username}/pokemon`, pokemon)

export const deletePokemon
    = (username,  id) => apiClient.delete(`/users/${username}/pokemon/${id}`)

export const retrieveUserPokemonMoves
    = (username, pokemon) => apiClient.get(`/users/${username}/pokemon/${pokemon}/moves`)