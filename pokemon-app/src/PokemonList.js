import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = await Promise.all(
        result.data.results.map(async (poke) => {
          const pokemonRecord = await axios(poke.url);
          return pokemonRecord.data;
        })
      );
      setPokemon(pokemonData);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pokemon-container">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={handleSearch}
        className="search-box"
      />
      <div className="pokemon-list">
        {filteredPokemon.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            <img src={poke.sprites.front_default} alt={poke.name} />
            <h3>{poke.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
