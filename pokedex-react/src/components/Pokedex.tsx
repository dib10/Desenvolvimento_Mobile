import React, { useState, useEffect} from "react";
import "./Pokedex.css";
import PokeCard from "./PokeCard";

// Definindo o tipo com base no json para simplificar a implementação
type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [erro, setErro] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('pokemon-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const buscarPokemon = async () => {
    if (!nome.trim()) return;
    
    if (pokemons.some(p => p.name.toLowerCase() === nome.toLowerCase())) {
        setErro(`O Pokémon ${nome} já está na lista.`);
        return;
    }

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      // Convertemos o JSON dizendo ao TS que ele tem formato Pokemon 
      const dados: Pokemon = await resposta.json();
      setPokemons(pokemonsAtuais => [...pokemonsAtuais, dados]);
      
      const capitalizarPrimeiraLetra = dados.name.charAt(0).toUpperCase() + dados.name.slice(1);
      console.log(`Pokemon ${capitalizarPrimeiraLetra} carregado com sucesso!`);

    } catch {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };
  
  const handleToggleFavorite = (pokemonName: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(pokemonName)) {
        return prevFavorites.filter(name => name !== pokemonName);
      } else {
        return [...prevFavorites, pokemonName];
      }
    });
  };

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">🔎 Pokédex</h2>

      <div className="pokedex-search-area">
        <input
          className="pokedex-input"
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && buscarPokemon()}
        />

        <button className="pokedex-button" onClick={buscarPokemon} disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && <p className="pokedex-error">{erro}</p>}

      <div className="pokecard-list">
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.name)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}