import React, { useState } from "react";

export default function Search({ search }) {
  const [value, setValue] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(value);
    }
  };

  return (
    <div className="d-flex">
      <input onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
      <button onClick={search.bind(null, value)}>Search</button>
    </div>
  );
}
