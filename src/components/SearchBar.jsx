const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-bar"
      aria-label="Search items"
    />
  );
};

export default SearchBar;
