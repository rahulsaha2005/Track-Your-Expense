import { useContext, useState, useEffect } from "react";
import { HistoryContext } from "./readInputData";
import down from "../assets/down.png";
import up from "../assets/up.png";

export default function Display() {
  const { History } = useContext(HistoryContext);
  const [sortedData, setSortedData] = useState(History);
  const [sorted, setSorted] = useState(0);
  const [Category, setCategory] = useState("ALL");

  useEffect(() => {
    applySortAndFilter(Category, sorted);
  }, [History, Category]);

  const applySortAndFilter = (category, order) => {
    let newData = [...History];

    if (order === 1) {
      newData.sort((a, b) => a[2] - b[2]);
    } else if (order === -1) {
      newData.sort((a, b) => b[2] - a[2]);
    }

    if (category !== "ALL") {
      newData = newData.sort((a, b) => {
        if (a[1] === category && b[1] !== category) return -1;
        if (a[1] !== category && b[1] === category) return 1;
        return 0;
      });
    }

    setSortedData(newData);
  };

  const handleSortClick = (order) => {
    setSorted(order);
    applySortAndFilter(Category, order);
  };

  const totalAmount = sortedData.reduce((acc, data) => acc + data[2], 0);

  return (
    <div className="table-wrapper">
      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select
                id="sortingBycategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
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
                width="10px"
                height="10px"
                title="descending"
                onClick={() => handleSortClick(-1)}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
              <img
                src={up}
                alt="asc"
                width="10px"
                height="10px"
                title="ascending"
                onClick={() => handleSortClick(1)}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={crypto.randomUUID()}>
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
              <strong> {"₹" + totalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
