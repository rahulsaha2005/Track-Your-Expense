import React, { useState, useContext } from "react";
import { HistoryContext } from "./readInputData";

export default function Expense() {
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [Amount, setAmount] = useState("");

  const { addtoHistory } = useContext(HistoryContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = [Title.trim(), Category.trim(), parseFloat(Amount)];
    addtoHistory(arr);
    setAmount("");
    setCategory("");
    setTitle("");
  };
  return (
    <>
      <form className="Expenese" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Category">Category</label>
          <select
            id="Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled></option>
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
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
