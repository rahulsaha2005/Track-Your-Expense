import React, { useState, useContext } from "react";
import { HistoryContext } from "./readInputData";
import Input from "./Input.jsx";
import Select from "./Select.jsx";

export default function Expense({ expense, setExpense }) {
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const { History, setHistory } = useContext(HistoryContext);
  const validateConfig = {
    Title: [
      { required: true, message: "Title is required" },
      { minLength: 5, message: "Length must be at least 5 characters long" },
    ],
    Category: [{ required: true, message: "Category selection is required" }],
    Amount: [{ required: true, message: "Amount is required" }],
  };

  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateConfig[key]) return;
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key.toLowerCase()] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key.toLowerCase()] = rule.message;
          return true;
        }
        return false;
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validState = validate({
      Title: expense.Title,
      Category: expense.Category,
      Amount: expense.Amount,
    });
    if (Object.keys(validState).length > 0) return;

    const entry = [
      expense.Title.trim(),
      expense.Category.trim(),
      parseFloat(expense.Amount),
      expense.id || crypto.randomUUID(),
    ];

    if (expense.id) {
      setHistory((prev) =>
        prev.map((item) => (item[3] === expense.id ? entry : item))
      );
    } else {
      setHistory((prev) => [...prev, entry]);
    }

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
      <Input
        htmlFor="Title"
        label="Title"
        type="text"
        id="Title"
        value={expense.Title}
        onchange={handleChange}
        className="error"
        errors={errors.title}
      />

      <Select
        htmlFor="Category"
        label="Category"
        id="Category"
        value={expense.Category}
        onChange={handleChange}
        className="error"
        errors={errors.category}
        defaultValue="---Select Category---"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />

      <Input
        htmlFor="Amount"
        label="Amount"
        type="number"
        id="Amount"
        value={expense.Amount}
        onchange={handleChange}
        className="error"
        errors={errors.amount}
      />

      <button type="submit">{expense.id ? "Update" : "Add"}</button>
    </form>
  );
}
