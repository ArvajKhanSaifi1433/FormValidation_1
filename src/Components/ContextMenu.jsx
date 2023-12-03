import React from "react";
import { useText } from "../Hook/Context";

function ContextMenu() {
  const {
    contextPosition,
    setContextPosition,
    deleteText,
    setRowId,
    rowId,
    data,
    SetAllData,
  } = useText();
  if (!contextPosition.left) return;
  return (
    <div
      style={contextPosition}
      className="absolute cursor-pointer z-10 top-0 bg-slate-300/40  backdrop-blur-md"
    >
      <div
        className=" p-3 border-b border-b-black active:bg-blue-200 font-semibold active:text-white"
        onClick={(e) => {
          const { ProductName, Color, Category, Price, allData } = data.find(
            (ele) => ele.id === rowId
          );
          SetAllData({ ProductName, Color, Category, Price });
          setContextPosition({});
        }}
      >
        Edit
      </div>
      <div
        className=" p-3 border-b active:bg-blue-200 font-semibold active:text-white"
        onClick={(e) => {
          deleteText(rowId);
          setContextPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
