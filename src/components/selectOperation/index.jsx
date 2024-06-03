import { useState } from "react";
import "./index.css";

export const SelectOperation = ({
  firstSet,
  secondSet,
  setFirstSet,
  setSecondSet,
}) => {
  const [inputValue, setInputValue] = useState();

  const writeNumbers = (array) => {
    return array.map((num) => num.toString()).join(", ");
  };

  const handleSubmit = () => {
    const options = [
      null,
      null,
      null,
      null,
      () => {
        setFirstSet([]);
        setSecondSet([]);
      },
    ];
    const selectedOption = options[inputValue - 1];
    selectedOption();
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
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
