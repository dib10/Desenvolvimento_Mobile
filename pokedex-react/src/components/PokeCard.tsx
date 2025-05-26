import React, { useState } from 'react';
import './PokeCard.css'; 

type Pokemon = {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
    };
    types: Array<{
        type: {
            name: string;
        };
    }>;
};

// Interface para as props do PokeCard
interface PokeCardProps {
    pokemon: Pokemon;
}

export default function PokeCard({ pokemon }: PokeCardProps) {
    //aqui usa UseState para manipular o estado do componente, inicializando como false
    const [isFavorite, setIsFavorite] = useState(false);

    //Renderiza o componente
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const capitalizarPrimeiraLetra = (str: string): string => { 
        if (!str) return ''; 
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="poke-card">

            <h3 className="pokecard-name"> 
                {capitalizarPrimeiraLetra(pokemon.name)}
                {isFavorite && <span className="pokecard-favorite-star"> ⭐</span>} 
            </h3>

            {pokemon.sprites.front_default && (
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="pokecard-image" 
                />
            )}

            <div className="pokecard-info"> 
                <p>
                    <strong>Altura:</strong> {pokemon.height * 10} cm
                </p>
                <p>
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                </p>
                <p>
                    <strong>Tipos:</strong> {pokemon.types.map((t) => capitalizarPrimeiraLetra(t.type.name)).join(' / ')}
                </p>


                <button onClick={toggleFavorite} className="pokecard-favorite-button"> 
                    {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
            </div>
        </div>
    );
}