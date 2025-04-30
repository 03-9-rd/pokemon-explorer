const TypeFilter = ({ type, setType }) => {
    const types = [
      "All", "Fire", "Water", "Grass", "Electric", "Rock", "Ghost",
      "Bug", "Normal", "Poison", "Ground", "Psychic", "Ice", "Dragon", "Fighting", "Fairy"
    ];
  
    return (
      <select value={type} onChange={(e) => setType(e.target.value)} className="type-select">
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    );
  };
  export default TypeFilter;
  