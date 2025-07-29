import Expense from "./components/expenseInput";
import Display from "./components/useInputData";
import { useState } from "react";
import useLocalStorage from "./components/useLocalStorage";

export default function App() {
  const [expense, setExpense] = useState({
    Title: "",
    Category: "",
    Amount: "",
  });
  // console.log(expense);
  // const [localdata, setLocaldata] = useLocalStorage("mydata", [1, 2, 3]);
  // console.log(localdata);
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
