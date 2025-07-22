import { createContext, useState } from "react";
export const HistoryContext = createContext();
export function HistoryProvider({ children }) {
  const [History, setHistory] = useState([]);

  const addtoHistory = (value) => {
    setHistory((prev) => {
      const updated = [...prev, value];
      updated.forEach((data) => {
        console.log(data);
      });
      return updated;
    });
  };

  return (
    <>
      <HistoryContext.Provider value={{ History, addtoHistory }}>
        {children}
      </HistoryContext.Provider>
    </>
  );
}
