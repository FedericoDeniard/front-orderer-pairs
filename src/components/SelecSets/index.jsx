import { useState } from "react";
import "./index.css";

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

      // Si no hay errores, actualiza los estados
      setFirstSet(firstArray);
      setSecondSet(secondArray);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="MainMenu-Title">
        <h4>Add the 2 sets of numbers</h4>
        <p>Enter a comma-separated list of numbers in each field below.</p>
      </div>

      <div className="setNumbers">
        <label htmlFor="firstSet">First set of numbers</label>
        <textarea
          value={firstValue}
          onChange={(e) => setFirstValue(e.target.value)}
          id="firstSet"
          type="text"
          placeholder="Enter numbers, separated by commas."
        ></textarea>
      </div>
      <div className="setNumbers">
        <label htmlFor="secondSet">Second set of numbers</label>
        <textarea
          value={secondValue}
          onChange={(e) => setSecondValue(e.target.value)}
          id="secondSet"
          type="text"
          placeholder="Enter numbers, separated by commas."
        ></textarea>
        <button onClick={handleSubmit}>Send values</button>
      </div>
    </>
  );
};
