import { useState } from "react";

export function useFilter(datalist, callback) {
  const [query, setQuery] = useState("");

  const filteredData = datalist.filter((data) => {
    if (query.toLowerCase() === "all" || query === "") {
      return true;
    }
    return callback(data).toLowerCase().includes(query.toLowerCase());
  });

  return [filteredData, setQuery];
}
