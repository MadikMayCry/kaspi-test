import React, { useState } from "react";

let { useEffect } = React;

export default function Divisions({ data = [] }) {
  return (
    <div className="wrapper">
      <ul className="division-container">
        {data.map((d, i) => (
          <Division key={d.id} item={d} />
        ))}
      </ul>
    </div>
  );
}

const Division = ({ item }) => {
  let { subdivisions, name } = item;

  const [selectedDivision, setSelected] = useState();
  const [visible, setVisible] = useState(false);
  const subDivisions = subdivisions && subdivisions.length && true;
  const toggleVisible = () => setVisible((prev) => !prev);

  useEffect(() => {
    console.log(selectedDivision);
  }, [selectedDivision]);

  return (
    <>
      <li className={(subDivisions && "hasChild") + " division-item"}>
        <div
          className="d-flex"
          onClick={() => {
            toggleVisible();
            setSelected(item);
          }}
        >
          {subDivisions ? (
            <div className={`${visible ? "visible" : ""} division-toggle d-inline `}>
              {visible ? "-" : "+"}
            </div>
          ) : null}
          <div className="col division-head">{name}</div>
        </div>
        {subDivisions && visible ? (
          <div className="division-content">
            <ul className="division-container">
              <Divisions data={subdivisions} />
            </ul>
          </div>
        ) : null}
      </li>
      {/* <pre>{JSON.stringify(selectedDivision, null, 2)}</pre> */}
    </>
  );
};
