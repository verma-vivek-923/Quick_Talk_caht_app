import React, { useEffect, useState } from "react";

const Search = ({ users, onSearch }) => {
  const [searchVal, setSearchVal] = useState("");

  console.log(users);

  useEffect(() => {
    const searchResult = users?.filter((user) =>
      user.name.toLowerCase().includes(searchVal.toLowerCase())  //must use return if use {} for any function
    );
    console.log(searchResult);
    onSearch(searchResult);
  }, [searchVal, users]);


  
  return (
    <div className="px-4 pb-2">
      <div>
        <label className="input border-none focus-within:outline-none focus-within:border-b-2 border-b-green-300">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="focus-within:outline-none focus-within:border-b-2 border-green-300"
            required
            placeholder="Search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Search;
