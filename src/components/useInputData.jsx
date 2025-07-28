import { useContext, useState, useEffect } from "react";
import { HistoryContext } from "./readInputData";
import down from "../assets/down.png";
import up from "../assets/up.png";
import { useFilter } from "./filter";

export default function Display() {
  const { History } = useContext(HistoryContext);

  const [sortOrder, setSortOrder] = useState(0); // 0=no sort, 1=asc, -1=desc
  const [category, setCategory] = useState("ALL");

  // Get filtered data based on category
  const [filteredData, setQuery] = useFilter(History, (item) => item[1]);

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    let data = [...filteredData];

    // Sort after filtering
    if (sortOrder === 1) {
      data.sort((a, b) => a[2] - b[2]);
    } else if (sortOrder === -1) {
      data.sort((a, b) => b[2] - a[2]);
    }

    setDisplayData(data);
  }, [filteredData, sortOrder]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    setQuery(value); // updates useFilter hook
  };

  const totalAmount = displayData.reduce((sum, cur) => sum + cur[2], 0);

  return (
    <div className="table-wrapper">
      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select
                value={category}
                onChange={handleCategoryChange}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <option value="ALL">ALL</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th>
              Amount
              <img
                src={down}
                alt="desc"
                width="10"
                height="10"
                title="descending"
                onClick={() => setSortOrder(-1)}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
              <img
                src={up}
                alt="asc"
                width="10"
                height="10"
                title="ascending"
                onClick={() => setSortOrder(1)}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((data, index) => (
            <tr key={index}>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
              <td>{"₹" + data[2]}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td>
              <strong>₹{totalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
