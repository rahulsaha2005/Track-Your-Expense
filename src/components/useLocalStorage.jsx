import { useEffect, useState } from "react";

export default function useLocalStorage(key, intialdata) {
  const [data, setData] = useState(intialdata);
  useEffect(() => {
    const tillNotExist = JSON.parse(localStorage.getItem(key));
    if (tillNotExist) {
      setData(tillNotExist);
    } else {
      localStorage.setItem(key, JSON.stringify(intialdata));
    }
  }, []);

  const updateLocalStorage = (newdata) => {
    if (typeof newdata === "function") {
      localStorage.setItem(key, JSON.stringify(newdata(data)));
    } else localStorage.setItem(key, JSON.stringify(newdata));
    setData(newdata);
  };
  return [data, updateLocalStorage];
}
