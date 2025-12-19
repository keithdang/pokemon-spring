import { apiClient } from './ApiClient'

export const retrieveAllPokemon
    = () => apiClient.get(`/pokemonspecies`)


export const retrieveUserPokemon
    = (username) => apiClient.get(`/users/${username}/pokemon`)

export const addPokemonToTrainer
    = (username,  pokemon) => apiClient.post(`/users/${username}/pokemon`, pokemon)