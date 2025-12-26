export type PokemonSpecies = {
  id: number;
  types: string[];
};

export type UserPokemon = {
  id: number;
  name: string;
  level: number;
  currentHp: number;
  maxHp: number;
  currentXp?: number;
  xpToNextLevel?: number;
  species: PokemonSpecies;
};

export type SpeciesPokemon = {
  id: number;
  name: string;
  types: string[];
};

export type BasePokemon = UserPokemon | SpeciesPokemon;

export type BasePokemonRowProps = {
  pokemon: BasePokemon | null;
  mode?: "user" | "species";
  showExp?: boolean;
  actions?: (pokemon: BasePokemon) => React.ReactNode;
};

export type Move = {
  id: number;
  name: string;
  damage: number;
  type: string;
};

export type MovesComponentProps = {
  moves: Move[];
  handleAttack?: (
    moveId: number,
    attackerId: number,
    defenderId: number
  ) => void;
  attackerId: number;
  defenderId: number;
};
