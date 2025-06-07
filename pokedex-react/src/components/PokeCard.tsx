import React from 'react';
import './PokeCard.css'; 

type Pokemon = {
    id: number;
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
    isFavorite: boolean;
    onToggleFavorite: (pokemonName: string) => void;
}

export default function PokeCard({ pokemon, isFavorite, onToggleFavorite }: PokeCardProps) {

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


                <button onClick={() => onToggleFavorite(pokemon.name)} className="pokecard-favorite-button"> 
                    {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
            </div>
        </div>
    );
}