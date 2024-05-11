import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPokemon();
  }, [searchQuery, offset]);

  const fetchPokemon = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`;

      console.log(searchQuery);

      if (searchQuery) {
        url = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (searchQuery) {
        setPokemonData([data]);
      } else {
        setPokemonData((prevData) => [...prevData, ...data.results]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevState) => prevState + 50);
    fetchPokemon();
  }

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPokemonData([]);
      setSearchQuery(event.currentTarget.value.toLowerCase());
      setOffset(0);
    }
  };


  return (
    <main>
      <div className="container mx-auto py-8">
        <div className="py-4 px-6">
          <input type="text" placeholder="Search..."
                 className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                 onKeyPress={handleSearch}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemonData.map((pokemon, index) => (
            <Link
              key={index}
              href={`/pokemon/${pokemon.name}`} // Dynamically generate URL
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="Placeholder Image"
                   className="w-full"/>
              <div className="p-4">
                <h3 className="text-xl text-center font-medium mb-2">{pokemon.name.toUpperCase()}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-white px-8 py-2 border text-center" onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    </main>
  );
}
