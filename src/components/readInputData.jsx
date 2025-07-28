import { createContext, useState } from "react";

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [History, setHistory] = useState([]);

  const addtoHistory = (value) => {
    setHistory((prev) => [...prev, value]);
  };

  return (
    <HistoryContext.Provider value={{ History, setHistory, addtoHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}
