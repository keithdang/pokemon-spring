export type RouteParams = {
  id: string;
};

export type NameFormValues = {
  name: string;
};

export type PokemonSpecies = {
  id: number;
  name: string;
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
  partyOrder?: number;
};

export type BasePokemon = UserPokemon | PokemonSpecies;

export type BasePokemonRowProps<T extends BasePokemon> = {
  pokemon: T;
  mode?: "user" | "species";
  showExp?: boolean;
  actions?: (pokemon: T) => React.ReactNode;
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
  attackerId?: number;
  defenderId?: number;
};

export type BasePokemonInfoProps<T extends BasePokemon> = {
  pokemon: T | T[];
  mode?: "user" | "species";
  showExp?: boolean;
  actions?: (pokemon: T) => React.ReactNode;
};
