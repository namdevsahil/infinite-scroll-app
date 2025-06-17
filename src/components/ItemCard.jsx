const ItemCard = ({ item }) => {
  return (
    <div className="card" tabIndex={0} aria-label={item.title}>
      <img src={item.thumbnailUrl} alt={item.title} />
      <h3>{item.title}</h3>
    </div>
  );
};

export default ItemCard;
