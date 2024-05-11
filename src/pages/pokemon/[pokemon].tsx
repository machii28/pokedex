// @ts-ignore
import {Key, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function PokemonDetails() {
  const router = useRouter();
  const {pokemon} = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<any[]>(null);

  useEffect(() => {
    if (!pokemon) return;

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  if (pokemon === null) {
    return <div>Loading...</div>;
  }

  if (!pokemonDetails) {
    return <div>No details found for {pokemon}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">{pokemonDetails.name.toUpperCase()}</h1>
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${pokemonDetails.name}.png`}
          alt={`${pokemonDetails.name} sprite`}
          className="mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold mb-2 text-center">Types:</h2>
        <div className="text-center">
          {pokemonDetails.types.map((type: any, index: number) => (
            <p key={index} className="mb-1 inline-flex p-3 border rounded">{type.type.name.toUpperCase()}</p>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-2 text-center">Abilities:</h2>
        <ul className="text-center">
          {pokemonDetails.abilities.map((ability: any, index: number) => (
            <li key={index} className="mb-1">{ability.ability.name.toUpperCase()}</li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-center">Stats:</h2>
        <ul>
          {pokemonDetails.stats.map((stat: any, index: number) => (
            <li key={index} className="mb-1 ml-8">{stat.stat.name.toUpperCase()}: {stat.base_stat}</li>
          ))}
        </ul>
      </div>
      <Link href="/" className="mx-auto px-4 py-2 text-white text-center bg-green-700">Back</Link>
    </div>
  );
}
