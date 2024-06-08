import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-6 lg:px-8 shadow" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image className="h-8 w-auto" src={'/images/pokeball.png'} alt={'PokemonCard'} width={300} height={0}/>
        </Link>
      </div>
      <div className="flex lg:hidden">
        <button type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:gap-x-12 lg:justify-end">
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">Pokedex</Link>
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">Team Builder</Link>
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">Type Chart</Link>
      </div>
    </nav>
  );
}