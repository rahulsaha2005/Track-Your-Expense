import React, { useContext } from "react";
import { HistoryContext } from "./readInputData";

export default function ContextMenu({ position, setPosition, id, setExpense }) {
  const { History, setHistory } = useContext(HistoryContext);

  if (!position?.left) return null;

  const handleEdit = () => {
    const index = History.findIndex((data) => data[3] === id);
    if (index !== -1) {
      const [Title, Category, Amount, entryId] = History[index];
      setExpense({ Title, Category, Amount, id: entryId });
    }
    setPosition(null);
  };

  const handleDelete = () => {
    const updated = History.filter((item) => item[3] !== id);
    setHistory(updated);
    setPosition(null);
  };

  return (
    <div className="ContextMenu" style={position}>
      <div onClick={handleEdit}>Edit</div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
}
