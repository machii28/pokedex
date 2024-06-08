import {useEffect, useState} from "react";
import PokemonCard from "@/components/PokemonCard";

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [offset]);
  const fetchPokemon = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`;

      const response = await fetch(url);
      const data = await response.json();

      setPokemonData((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="p-1 flex flex-wrap items-center justify-center">
        {pokemonData.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}