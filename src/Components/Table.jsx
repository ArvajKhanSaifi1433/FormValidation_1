import React, { useState } from "react";
import Data from "../Hook/Data";
import { useText } from "../Hook/Context";

function Table() {
  const { data, setData, contextPosition, setContextPosition, setRowId } =
    useText();
  const Total = data.reduce((acc, current) => acc + Number(current.Price), 0);
  const [sorted, setSorted] = useState(() => () => {});

  return (
    <>
      <div
        className="relative overflow-x-scroll shadow-md sm:rounded-lg"
        onClick={(e) => {
          if (contextPosition.left) setContextPosition({});
        }}
      >
        <table className="w-full text-center  text-sm  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-2.5">
                Product name
              </th>
              <th
                scope="col"
                className="px-6 py-2.5 inline-flex items-center gap-1"
              >
                <span>Color</span>{" "}
                <span
                  className="font-bold inline-block text-xl hover:-translate-y-1 duration-500 cursor-pointer"
                  onClick={(e) => setSorted(() => (a, b) => a.Price - b.Price)}
                >
                  ↑
                </span>
                <span
                  className="font-bold inline-block text-xl hover:translate-y-1 duration-500 cursor-pointer"
                  onClick={(e) => setSorted(() => (a, b) => b.Price - a.Price)}
                >
                  ↓
                </span>
              </th>
              <th scope="col" className="px-6 py-2.5">
                <select className="px-6 py-2.5 focus:outline-none">
                  <option value="">Select Category</option>
                  <option value="laptop">Laptop</option>
                  <option value="laptop pc">Laptop PC</option>
                  <option value="accessories">Accessories</option>
                </select>
              </th>
              <th scope="col" className="px-6 py-2.5">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data.sort(sorted).map((element) => (
              <tr
                key={element.id}
                className="bg-white border-b"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextPosition({ left: e.clientX, top: e.clientY });
                  setRowId(element.id);
                }}
              >
                <th className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap">
                  {element.ProductName}
                </th>
                <td className="px-6 py-2.5">{element.Color}</td>
                <td className="px-6 py-2.5">{element.Category}</td>
                <td className="px-6 py-2.5">{element.Price}</td>
              </tr>
            ))}
            <tr className="bg-white dark:bg-gray-800 ">
              <th
                scope="row"
                className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Total
              </th>
              <th className="px-6 py-2.5"></th>
              <th className="px-6 py-2.5"></th>
              <th className="px-6 py-2.5">{Total}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
