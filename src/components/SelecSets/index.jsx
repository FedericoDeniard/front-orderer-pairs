import { useState } from "react";
import "./index.css";

import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const SelectSets = ({ setFirstSet, setSecondSet }) => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const handleSubmit = () => {
    const firstArray = firstValue.split(",");
    const secondArray = secondValue.split(",");
    try {
      firstArray.forEach((number, index) => {
        if (!/^\d+$/.test(number.trim())) {
          throw new Error(
            "Invalid input. Please enter numbers separated by commas."
          );
        }
        const parsedNumber = parseInt(number);
        firstArray[index] = parsedNumber;
      });

      secondArray.forEach((number, index) => {
        if (!/^\d+$/.test(number.trim())) {
          throw new Error(
            "Invalid input. Please enter numbers separated by commas."
          );
        }
        const parsedNumber = parseInt(number);
        secondArray[index] = parsedNumber;
      });

      setFirstSet(firstArray);
      setSecondSet(secondArray);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Box className="MainMenu-Title">
        <h4>Add the 2 sets of numbers</h4>
        <p>Enter a comma-separated list of numbers in each field below.</p>
      </Box>

      <Box className="setNumbers">
        <label id="firstSet">First set of numbers</label>
        <TextField
          variant="filled"
          value={firstValue}
          onChange={(e) => setFirstValue(e.target.value)}
          id="firstSet"
          type="text"
          placeholder="Enter numbers, separated by commas."
        ></TextField>
      </Box>
      <Box className="setNumbers">
        <label id="secondSet">Second set of numbers</label>
        <TextField
          variant="filled"
          value={secondValue}
          onChange={(e) => setSecondValue(e.target.value)}
          id="secondSet"
          type="text"
          placeholder="Enter numbers, separated by commas."
        ></TextField>
        <Button
          variant="contained"
          disabled={!firstValue || !secondValue}
          onClick={handleSubmit}
          endIcon={<SendIcon />}
        >
          Send values
        </Button>
      </Box>
    </>
  );
};
