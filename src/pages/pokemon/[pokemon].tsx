import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const Pokemon = () => {
  const router = useRouter();
  const {pokemon} = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<any>({});
  const [pokemonSpecies, setPokemonSpecies] = useState<any>({});

  useEffect(() => {
    if (!pokemon) return;

    fetchPokemonDetails();
    fetchPokemonSpecies();
  }, [pokemon]);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPokemonSpecies = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
      const data = await response.json();
      setPokemonSpecies(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (pokemon === null) {
    return <div>Loading...</div>;
  }

  if (!pokemonDetails || !pokemonDetails.name || !pokemonDetails.types || !pokemonDetails.abilities || !pokemonDetails.stats) {
    return <div>No details found for {pokemon}</div>;
  }

  const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  return (
    <main className="container mx-auto w-full">
      <Navbar/>

      <div className="grid grid-flow-col gap-4">
        <div
          className="col-span-3 relative rounded-lg p-6"
          style={{
            backgroundColor: typeColors[pokemonDetails.types[0]?.type?.name] || '#f5f5f5',
          }}
        >
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{transform: 'scale(1.5)', opacity: 0.1, zIndex: '0'}}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative px-10 flex items-center justify-center">
            <Image
              className="relative w-full pokemon-image"
              src={`https://img.pokemondb.net/sprites/bank/normal/${pokemonDetails?.name}.png`}
              alt={pokemonDetails.name}
              width={300}
              height={300}
            />
          </div>

          <div className="flex justify-center my-3">
            {pokemonDetails.types.map((type, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 mr-2 rounded-full text-lg border-white border"
                style={{
                  backgroundColor: typeColors[type.type.name],
                  color: '#fff',
                }}
              >
                  {type.type.name.toUpperCase()}
                </span>
            ))}
          </div>
        </div>
        <div className="col-span-3 my-16 mx-auto">
          <h1 className={'text-4xl font-medium'}>
            {pokemonDetails.name.toUpperCase()}
            <audio controls className='inline-block ml-3'>
              <source src={pokemonDetails.cries.latest} type={'audio/ogg'}/>
            </audio>
          </h1>
          <div className="mt-4">

          </div>
          <p className="text-xl font-light my-8">
            {pokemonSpecies?.flavor_text_entries[0].flavor_text}
          </p>

          <p className="text-xl font-medium">
            Abilities:
          </p>
          <ul className='ml-3'>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>
                {ability.ability.name.toUpperCase()} {
                ability.is_hidden
                  ? <span className='text-sm font-bold'>(Hidden Ability)</span>
                  : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
    ;
}

export default Pokemon;