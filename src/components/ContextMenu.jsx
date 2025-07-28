import React from "react";
import { HistoryContext } from "./readInputData";
import { useContext } from "react";

export default function ContextMenu({ postion, setPosition, id }) {
  if (!postion.left) return;
  const { History } = useContext(HistoryContext);

  return (
    <div className="ContextMenu" style={postion}>
      <div
        onClick={() => {
          console.log("Edit");
          setPosition(null);
        }}
      >
        Edit
      </div>
      <div
         onClick={() => {
          // console.log("delete");
          setPosition(null);
          const index = History.findIndex((data) => data[3] === id);
          if (index !== -1) {
            History.splice(index, 1);
          }
          // console.log("After delete:", History);
        }}
      >
        Delete
      </div>
    </div>
  );
}

