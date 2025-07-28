import { useContext, useState } from "react";
import { HistoryContext } from "./readInputData";
import down from "../assets/down.png";
import up from "../assets/up.png";
import { useFilter } from "./filter";
import ContextMenu from "./ContextMenu";

export default function Display({ expense, setExpense }) {
  const { History } = useContext(HistoryContext);
  const [sortOrder, setSortOrder] = useState(0);
  const [filteredData, setQuery] = useFilter(History, (item) => item[1]);
  const [category, setCategory] = useState("ALL");
  const [position, setPosition] = useState(null);
  const [id, setId] = useState("");

  let displayData = [...filteredData];
  if (sortOrder === 1) displayData.sort((a, b) => a[2] - b[2]);
  else if (sortOrder === -1) displayData.sort((a, b) => b[2] - a[2]);

  const totalAmount = displayData.reduce((sum, d) => sum + d[2], 0);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    setQuery(value);
  };

  return (
    <>
      {position && (
        <ContextMenu
          position={position}
          setPosition={setPosition}
          id={id}
          setExpense={setExpense}
        />
      )}

      <div className="table-wrapper" onClick={() => setPosition(null)}>
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
              <tr
                key={index}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setPosition({ left: e.clientX - 2, top: e.clientY - 1 });
                  setId(data[3]);
                }}
              >
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
    </>
  );
}
