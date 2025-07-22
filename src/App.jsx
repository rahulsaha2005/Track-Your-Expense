import Expense from "./components/expenseInput";
import Display from "./components/useInputData";

export default function App() {
  return (
    <>
      <h1>Track Your Expense</h1>
      <div className="main-body">
        <Expense />
        <Display />
      </div>
    </>
  );
}
