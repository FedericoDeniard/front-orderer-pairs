import { useState } from "react";
import "./index.css";

export const SelectOperation = ({
  firstSet,
  secondSet,
  setFirstSet,
  setSecondSet,
}) => {
  const [inputValue, setInputValue] = useState(0);

  const [solution, setSolution] = useState({});

  const writeNumbers = (array) => {
    return array.map((num) => num.toString()).join(", ");
  };

  const handleSubmit = () => {
    const data = {
      firstSet: firstSet,
      secondSet: secondSet,
      equation: equation,
      operation: inputValue,
    };
    const send_data = () => {
      fetch("https://back-orderer-pairs.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received:", data);
          setSolution(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const options = [
      () => send_data(),
      () => send_data(),
      () => send_data(),
      () => send_data(),
      () => {
        setFirstSet([]);
        setSecondSet([]);
      },
    ];

    try {
      const x = 1;
      const y = 1;
      const safeDict = { x: x, y: y };
      eval(equation, { __builtins__: null }, safeDict);
      setError("");
    } catch (error) {
      setError(error.message);
    }

    const selectedOption = options[inputValue - 1];
    selectedOption();
  };

  const [equation, setEquation] = useState("");
  const [error, setError] = useState("");

  const showMatrix = (matrix) => {
    let message = "";
    for (let i = 0; i < matrix.length; i++) {
      message += "[ ";
      for (let j = 0; j < matrix[i].length; j++) {
        message += matrix[i][j];
        if (j < matrix[i].length - 1) {
          message += ", ";
        }
      }
      message += " ] ";
      if (i < matrix.length - 1) {
        message += "<br />"; // Agregar <br /> solo si no es la última fila
      }
    }
    return message;
  };

  const handleEquation = () => {};

  const writeAnswer = () => {
    return (
      <div>
        <p>
          Product: [
          {solution["product"].map((pair) => `[${pair.join(", ")}]`).join(", ")}
          ]
        </p>
        <p>
          Relation: [
          {solution["relation"]
            .map((pair) => `[${pair.join(", ")}]`)
            .join(", ")}
          ]
        </p>
        <p>Matrix: </p>
        <div
          dangerouslySetInnerHTML={{ __html: showMatrix(solution["matrix"]) }}
        />
        <p>Domain: [{solution["domain"].join(", ")}]</p>
        <p>Range: [{solution["range"].join(", ")}]</p>
        <p>{solution["property"]}</p>
      </div>
    );
  };

  return (
    <>
      <h4>Select an option</h4>
      <p>A = {writeNumbers(firstSet)}</p>
      <p>B = {writeNumbers(secondSet)}</p>
      <div className="option">
        <input
          id="AxB"
          type="radio"
          name="operation"
          value={1}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
        <label htmlFor="AxB">AxB</label>
      </div>
      <div className="option">
        <input
          id="BxA"
          type="radio"
          name="operation"
          value={2}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <label htmlFor="BxA">BxA</label>
      </div>
      <div className="option">
        <input
          id="AxA"
          type="radio"
          name="operation"
          value={3}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <label htmlFor="AxA">AxA</label>
      </div>
      <div className="option">
        <input
          id="BxB"
          type="radio"
          name="operation"
          value={4}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <label htmlFor="BxB">BxB</label>
      </div>
      <div className="option">
        <input
          id="back"
          type="radio"
          name="operation"
          value={5}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <label htmlFor="back">Change Values</label>
      </div>
      <div className="option">
        <p className="example">Example: x &gt; y*2</p>
        <textarea
          placeholder="Write an equation"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />

        {error && <p>{error}</p>}
      </div>
      <button disabled={inputValue == 0 || !equation} onClick={handleSubmit}>
        Submit
      </button>
      {Object.keys(solution).length !== 0 && writeAnswer()}
    </>
  );
};
