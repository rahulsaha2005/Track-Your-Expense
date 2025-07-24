import React, { useContext, useRef } from "react";
import { HistoryContext } from "./readInputData";

export default function Expense() {
  const Titleref = useRef();
  const Categoryref = useRef();
  const Amountref = useRef();

  const { addtoHistory } = useContext(HistoryContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const arr = [
      Titleref.current.value.trim(),
      Categoryref.current.value.trim(),
      parseFloat(Amountref.current.value),
    ];

    addtoHistory(arr);

    Titleref.current.value = "";
    Categoryref.current.value = "";
    Amountref.current.value = "";
  };

  return (
    <form className="Expenese" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          id="Title"
          ref={Titleref}
          required
        />
      </div>

      <div>
        <label htmlFor="Category">Category</label>
        <select
          id="Category"
          ref={Categoryref}
          style={{fontSize:"15px"}}
          required
        >
          <option value="" disabled >-- Select Category --</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
      </div>

      <div>
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          id="Amount"
          min="0"
          step="0.01"
          ref={Amountref}
          required
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
}
