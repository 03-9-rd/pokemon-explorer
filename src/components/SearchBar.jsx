const SearchBar = ({ search, setSearch }) => (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
    />
  );
  export default SearchBar;
  