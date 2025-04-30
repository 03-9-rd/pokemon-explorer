const PokemonCard = ({ data }) => {
    return (
      <div className="card">
        <h3>{data.name.toUpperCase()}</h3>
        <img src={data.sprites.front_default} alt={data.name} />
        <p>ID: #{data.id}</p>
        <p>Type: {data.types.map(t => t.type.name).join(", ")}</p>
      </div>
    );
  };
  export default PokemonCard;
  