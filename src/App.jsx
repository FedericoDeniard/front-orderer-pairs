import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SelectSets } from "./components/SelecSets";
import "./App.css";
import { useState } from "react";
import { SelectOperation } from "./components/selectOperation";

function App() {
  const [firstSet, setFirstSet] = useState([]);
  const [secondSet, setSecondSet] = useState([]);

  return (
    <>
      {firstSet.length == 0 && secondSet.length == 0 ? (
        <SelectSets setFirstSet={setFirstSet} setSecondSet={setSecondSet} />
      ) : (
        <SelectOperation
          firstSet={firstSet}
          secondSet={secondSet}
          setFirstSet={setFirstSet}
          setSecondSet={setSecondSet}
        />
      )}
    </>
  );
}

export default App;
