import Expense from "./components/expenseInput";
import Display from "./components/useInputData";
import { useState } from "react";

export default function App() {
  const [expense, setExpense] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });
  return (
    <>
      <h1>Track Your Expense</h1>
      <div className="main-body">
        <Expense expense={expense} setExpense={setExpense} />
        <Display expense={expense} setExpense={setExpense} />
      </div>
    </>
  );
}
