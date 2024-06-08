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

  const handleLoadMore = () => {
    setOffset((prevState) => prevState + 50);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="p-1 flex flex-wrap items-center justify-center">
        {pokemonData.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </div>
  );
}