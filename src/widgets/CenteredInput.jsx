import { useState } from "react";

const CenteredInput = ({onSearch, isFetching}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
      onSearch(query); // Pass the query to the parent fetch function
    };
  return (
    <>
        {/* textbox container */}
      <div className="mt-6 flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Enter Student Number"
          className="px-4 py-2 outline-none w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          onClick={handleSearch}
          disabled={isFetching}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default CenteredInput;