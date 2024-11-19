import SearchBarProps from "../types/SearchBar";

export function SearchBar({ searchText, setSearchText }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchText(input);
  };

  return (
    <div className="searchbar-container">
      <input
        placeholder="Type ingredients..."
        type="text"
        className="search-bar"
        onChange={handleChange}
        value={searchText}
      />
    </div>
  );
}
