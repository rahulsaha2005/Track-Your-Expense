import React, { useState, useContext } from "react";
import { HistoryContext } from "./readInputData";
import Input from "./Input.jsx";
import Select from "./Select.jsx";

export default function Expense() {
  const [expense, setExpense] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const { addtoHistory } = useContext(HistoryContext);

  const validateConfig = {
    Title: [
      { required: true, message: "Title is required" },
      { minLength: 5, message: "lenght must be long atleast 5 character long" },
    ],
    Category: [{ required: true, message: "Category Selection is required" }],
    Amount: [{ required: true, message: "Amount is required" }],
  };

  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key.toLowerCase()] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key.toLowerCase()] = rule.message;
          return true;
        }
      });
    });

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
        defaultvalue="  -- Select Category --"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultValue={"---Select Category---"}
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

      <button type="submit">Add</button>
    </form>
  );
}
