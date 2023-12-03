import React, { useState } from "react";
import Form from "./Components/Form";
import Table from "./Components/Table";
import { TextProvider } from "./Hook/Context";
import Data from "./Hook/Data";
import ContextMenu from "./Components/ContextMenu";

export default function App() {
  const [data, setData] = useState(Data);
  const [allData, SetAllData] = useState({
    ProductName: "",
    Color: "",
    Category: "",
    Price: "",
  });
  const [rowId, setRowId] = useState("");
  const addText = (text) => {
    setData((prev) => [{ ...text }, ...prev]);
  };
  const updateText = (id, text) => {
    setData((prev) =>
      prev.map((ele) => (ele.id === id ? { ...text, id } : ele))
    );
  };

  const deleteText = (id) => {
    setData((prev) => prev.filter((ele) => ele.id !== id));
  };
  const [contextPosition, setContextPosition] = useState({});

  return (
    <TextProvider
      value={{
        allData,
        SetAllData,
        updateText,
        addText,
        data,
        setData,
        contextPosition,
        setContextPosition,
        deleteText,
        rowId,
        setRowId,
      }}
    >
      <ContextMenu />
      <div className="container flex justify-center md:mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="border shadow-lg p-4">
            <Form />
          </div>
          <div className="mt-4 md:mt-0 md:ml-4 ">
            <Table />
          </div>
        </div>
      </div>
    </TextProvider>
  );
}
