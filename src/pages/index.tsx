import {useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PokemonList from "@/components/PokemonList";

export default function Home() {
  return (
    <main className="container mx-auto w-full">
      <Navbar />

      <div className="my-10 grid justify-stretch">

        <div className="w-full text-center">
          <input placeholder="Name" className="border border-gray-500 p-4 rounded-3xl w-1/2" type="text"/>
        </div>

        <PokemonList />

      </div>
    </main>
  );
}


