import React, { useState, useContext } from "react";
import { HistoryContext } from "./readInputData";

export default function Expense() {
  const [expense, setExpense] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });

  const [errors, setErrors] = useState({});
  const { addtoHistory } = useContext(HistoryContext);

  const validate = (formData) => {
    const errorsData = {};

    if (!formData.Title.trim()) {
      errorsData.title = "Title is required";
    }

    if (!formData.Category.trim()) {
      errorsData.category = "Please select a category";
    }

    if (!formData.Amount.trim()) {
      errorsData.amount = "Amount is required";
    }

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validState = validate(expense);
    if (Object.keys(validState).length > 0) return;

    const arr = [
      expense.Title.trim(),
      expense.Category.trim(),
      parseFloat(expense.Amount),
    ];

    addtoHistory(arr);
    setExpense({ Title: "", Category: "", Amount: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id.toLowerCase()]: "",
    }));
  };

  return (
    <form className="Expenese" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          id="Title"
          value={expense.Title}
          onChange={handleChange}
        />
        <p className="error">{errors.title}</p>
      </div>

      <div>
        <label htmlFor="Category">Category</label>
        <select
          id="Category"
          value={expense.Category}
          onChange={handleChange}
        >
          <option value="" disabled>
            -- Select Category --
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        <p className="error">{errors.category}</p>
      </div>

      <div>
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          id="Amount"
          min="0"
          step="0.01"
          value={expense.Amount}
          onChange={handleChange}
        />
        <p className="error">{errors.amount}</p>
      </div>

      <button type="submit">Add</button>
    </form>
  );
}
