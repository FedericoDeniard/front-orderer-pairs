import { useState } from "react";
import "./index.css";
import { FormControlLabel, Radio, Button, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const SelectOperation = ({
  firstSet,
  secondSet,
  setFirstSet,
  setSecondSet,
}) => {
  const [inputValue, setInputValue] = useState(0);
  const [changeValue, setChangeValue] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const [solution, setSolution] = useState({});

  const writeNumbers = (array) => {
    return array.map((num) => num.toString()).join(", ");
  };

  const handleSubmit = () => {
    if (changeValue) {
      setFirstSet([]);
      setSecondSet([]);
    } else {
      const data = {
        firstSet: firstSet,
        secondSet: secondSet,
        equation: equation,
        operation: inputValue,
      };
      const send_data = () => {
        setFetchingData(true);
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
            setFetchingData(false);
            console.log("Data received:", data);
            setSolution(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      try {
        const x = 1;
        const y = 1;
        const safeDict = { x: x, y: y };
        eval(equation, { __builtins__: null }, safeDict);
        setError("");
      } catch (error) {
        setError(`${error.message}. Please write a valid equation`);
      }

      send_data();
    }
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
        message += "<br />";
      }
    }
    return message;
  };

  const writeAnswer = () => {
    if (Object.keys(solution).length === 0) {
      return null;
    }
    return (
      <div className="answers">
        <p>
          <p>
            Product: [
            {solution["product"]
              .map((pair) => `[${pair.join(", ")}]`)
              .join(", ")}
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
            dangerouslySetInnerHTML={{
              __html: showMatrix(solution["matrix"]),
            }}
          />
          <p>Domain: [{solution["domain"].join(", ")}]</p>
          <p>Range: [{solution["range"].join(", ")}]</p>
          <p>{solution["property"]}</p>
          <p>{solution["clasify"]}</p>
        </p>
      </div>
    );
  };

  return (
    <Box className="container">
      <h4>Select an option</h4>
      <p>
        A = {"{"}
        {writeNumbers(firstSet)}
        {"}"}
      </p>
      <p>
        B = {"{"}
        {writeNumbers(secondSet)}
        {"}"}
      </p>
      <FormControlLabel
        control={
          <Radio
            value={1}
            checked={inputValue === "1"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        }
        label="AxB"
      />
      <FormControlLabel
        control={
          <Radio
            value={2}
            checked={inputValue === "2"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        }
        label="BxA"
      />
      <FormControlLabel
        control={
          <Radio
            value={3}
            checked={inputValue === "3"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        }
        label="AxA"
      />
      <FormControlLabel
        control={
          <Radio
            value={4}
            checked={inputValue === "4"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        }
        label="BxB"
      />
      <div className="option">
        <p className="example">Example: x &gt; y*2</p>
        <TextField
          variant="filled"
          value={equation}
          placeholder="Write an equation"
          onChange={(e) => setEquation(e.target.value.toLocaleLowerCase())}
        />

        {error && <p className="error">{error}</p>}
      </div>
      <Button
        className="eq-submit"
        variant="contained"
        disabled={(inputValue === 0 || !equation) && !changeValue}
        onClick={handleSubmit}
        endIcon={<SendIcon />}
      >
        Submit
      </Button>
      {fetchingData ? (
        <div className="loading">
          <p>Fetching data... Please wait for the server response</p>
          <span class="loader"></span>
        </div>
      ) : (
        writeAnswer()
      )}
    </Box>
  );
};
