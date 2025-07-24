import React, { useContext } from "react";
import { HistoryContext } from "./readInputData";

export default function Expense() {
  const { addtoHistory } = useContext(HistoryContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const arr = [];
    for (const [key, value] of data.entries()) {
      if (key === "Amount") {
        arr.push(parseFloat(value || "0"));
      } else {
        arr.push(value);
      }
    }
    addtoHistory(arr);
    e.target.reset(); 
  };

  return (
    <>
      <form className="Expenese" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <input type="text" id="Title" name="Title" required />
        </div>

        <div>
          <label htmlFor="Category">Category</label>
          <select id="Category" name="Category" defaultValue="" required>
            <option value="" disabled hidden>
              Select category
            </option>
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
            name="Amount"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </>
  );
}
