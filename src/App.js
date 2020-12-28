import React, { useState } from "react";
import Divisions from "./components/divisions";
import Search from "./components/search";
import structure from "./data/structure.json";

function App() {
  let [filteredData, setFiltered] = useState(structure);

  const search = (term) => {
    const dataNode = {
      subdivisions: structure,
    };

    const matchedIDS = [];
    // find all items IDs that matches our search (or their children does)
    dfs(dataNode, term, matchedIDS);

    // filter the original data so that only matching items (and their fathers if they have) are returned
    let res = filter(structure, matchedIDS);
    setFiltered(res);
  };

  const dfs = (node, term, foundIDS) => {
    // Check if node.name contains term
    let isMatching = node.name && node.name.indexOf(term) > -1;

    // Check node subdivisions
    if (Array.isArray(node.subdivisions)) {
      node.subdivisions.forEach((child) => {
        const hasMatchingChild = dfs(child, term, foundIDS);
        isMatching = isMatching || hasMatchingChild;
      });
    }

    // We will add any item if it matches our search term or if it has a children that matches our term
    if (isMatching && node.id) {
      foundIDS.push(node.id);
    }

    return isMatching;
  };

  function filter(data, matchedIDS) {
    return data
      .filter((item) => matchedIDS.indexOf(item.id) > -1)
      .map(({ subdivisions, ...item }) => ({
        ...item,
        subdivisions: subdivisions ? filter(subdivisions, matchedIDS) : [],
      }));
  }

  return (
    <div className="App">
      <div style={containerStyle}>
        <Search search={search} />
        <Divisions data={filteredData} />
      </div>
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    </div>
  );
}

let containerStyle = {
  maxWidth: "50vw",
};

export default App;
