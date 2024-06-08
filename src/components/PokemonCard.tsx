import {useState, useEffect} from 'react';
import Image from 'next/image';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  const [info, setInfo] = useState<{ types: { type: { name: string } }[]; name?: string }>({
    types: [],
  });

  const fetchInfo = async () => {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [pokemon]);

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
    <div>
      <div
        className="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg"
        style={{
          backgroundColor: typeColors[info.types[0]?.type?.name] || '#f5f5f5',
        }}
      >
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
          style={{transform: 'scale(1.5)', opacity: 0.1}}
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
        <div className="relative pt-10 px-10 flex items-center justify-center">
          <div
            className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
            style={{
              background: 'radial-gradient(black, transparent 60%)',
              transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
              opacity: 0.2,
            }}
          ></div>
          <Image
            className="relative w-40 pokemon-image"
            src={`https://img.pokemondb.net/sprites/home/normal/${info?.name}.png`}
            alt={pokemon.name}
            width={300}
            height={300}
          />
        </div>
        <div className="relative text-white px-6 pb-6 mt-6 text-center">
          <div className="text-center">
            <span className="block font-semibold text-xl">
              {info?.name?.toUpperCase()}
            </span>
          </div>
          <div className="mt-4">
            {info.types.map((type, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 mr-2 rounded-full text-sm border-white border"
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
      </div>
      <style jsx>{`
          .pokemon-image {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              transform: perspective(1000px) rotateY(10deg) rotateX(10deg);
          }

          .pokemon-image:hover {
              transform: perspective(1000px) rotateY(0) rotateX(0) translateY(-10px);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }
      `}</style>
    </div>
  );
};

export default PokemonCard;
