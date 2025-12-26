import { apiClient } from "./ApiClient";
import { BasePokemon, Move } from "../../pokemon/types";

/* ---------- Pokemon API Service ---------- */

export const retrieveAllPokemon = (): Promise<{ data: BasePokemon[] }> =>
  apiClient.get(`/pokemonspecies`);

export const retrieveSpeciesPokemon = (
  id: number
): Promise<{ data: BasePokemon }> => apiClient.get(`/pokemonspecies/${id}`);

export const retrieveAllUserPokemon = (
  username: string
): Promise<{ data: BasePokemon[] }> =>
  apiClient.get(`/users/${username}/pokemon`);

export const retrieveAllComputerPokemon = (): Promise<{
  data: BasePokemon[];
}> => apiClient.get(`/users/computer/pokemon`);

export const retrieveUserPokemon = (
  username: string,
  pokemonId: number
): Promise<{ data: BasePokemon }> =>
  apiClient.get(`/users/${username}/pokemon/${pokemonId}`);

export const addPokemonToTrainer = (
  username: string,
  pokemon: Partial<BasePokemon>
): Promise<any> => apiClient.post(`/users/${username}/pokemon`, pokemon);

export const deletePokemon = (username: string, id: number): Promise<any> =>
  apiClient.delete(`/users/${username}/pokemon/${id}`);

export const updatePokemon = (
  username: string,
  id: number,
  pokemon: Partial<BasePokemon>
): Promise<{ data: BasePokemon }> =>
  apiClient.put(`/users/${username}/pokemon/${id}`, pokemon);

export const retrieveUserPokemonMoves = (
  username: string,
  pokemonId: number
): Promise<{ data: Move[] }> =>
  apiClient.get(`/users/${username}/pokemon/${pokemonId}/moves`);

export const retrieveSpeciesPokemonMoves = (
  id: number
): Promise<{ data: Move[] }> => apiClient.get(`/pokemonspecies/${id}/moves`);

export const attack = (
  username: string,
  pokemonId: number,
  moveId: number,
  opponentPokemonId: number
): Promise<any> =>
  apiClient.put(
    `/users/${username}/pokemon/${pokemonId}/moves/${moveId}/opp/${opponentPokemonId}`
  );

export const changePokemon = (
  username: string,
  pokemonId: number
): Promise<any> =>
  apiClient.put(`users/${username}/pokemon/${pokemonId}/change`);

export const setActivePokemon = (
  username: string,
  pokemonId: number
): Promise<any> =>
  apiClient.put(`/users/${username}/pokemon/${pokemonId}/set-active`);

export const heal = (
  username: string,
  pokemonId: number
): Promise<{ data: BasePokemon }> =>
  apiClient.put(`/users/${username}/pokemon/${pokemonId}/heal`);
