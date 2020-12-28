import React, { useRef, useState, useEffect } from "react";

function App() {
  let [textVal, setText] = useState("initial");
  let inputRef = useRef(1);
  let prevValue = useRef("");

  useEffect(() => {
    prevValue.current = textVal;
  }, [textVal]);

  return (
    <div className="App">
      <h1>Предыдущее значение {prevValue.current}</h1>
      <input
        type="text"
        ref={inputRef}
        value={textVal}
        onChange={(e) => setText(e.target.value)}
      />
      <pre>
        {JSON.stringify(
          [
            {
              title: "qwe",
              count: 123,
            },
          ],
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;
