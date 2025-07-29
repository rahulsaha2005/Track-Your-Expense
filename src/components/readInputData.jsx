import { createContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [History, setHistory] = useLocalStorage('expense',[]);

  const addtoHistory = setHistory;
  return (
    <HistoryContext.Provider value={{ History, setHistory, addtoHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}
