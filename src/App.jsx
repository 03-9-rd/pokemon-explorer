import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        );
        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  useEffect(() => {
    let result = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (type !== "All") {
      result = result.filter((p) =>
        p.types.some((t) => t.type.name === type.toLowerCase())
      );
    }
    setFilteredPokemon(result);
  }, [search, type, pokemonList]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <TypeFilter type={type} setType={setType} />
      </div>
      <div className="pokemon-list">
        {filteredPokemon.length ? (
          filteredPokemon.map((poke) => <PokemonCard key={poke.id} data={poke} />)
        ) : (
          <p>No Pokémon match your search.</p>
        )}
      </div>
    </div>
  );
};

export default App;
