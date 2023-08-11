export interface Location {
  id: number;
  name: string;
}

export interface Personagem {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: Location;
  episode: string[];
}
