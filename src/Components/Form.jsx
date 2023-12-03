import React, { useState } from "react";
import { useText } from "../Hook/Context";

function Form() {
  const { addText, allData, SetAllData, rowId, setRowId, updateText } =
    useText();
  const [error, setError] = useState({});
  const validationConfig = {
    ProductName: [
      { required: true, message: "Please Enter ProductName" },
      { minLength: 5, message: "Title should be at least 5 character long" },
    ],

    Color: [{ required: true, message: "Please Enter a Color" }],

    Category: [{ required: true, message: "Please Select a Category" }],

    Price: [
      { required: true, message: "Please Enter amount" },
      {
        Num_pat: /^[0-9]+$/,
        message: "Please Enter is Valid Price",
      },
    ],
  };

  const FormValidation = (Valid_Data) => {
    const obj = {};

    Object.entries(Valid_Data).forEach(([key, value]) => {
      validationConfig[key].some((role) => {
        if (role.required && !value) {
          obj[key] = role.message;
          return true;
        }
        if (role.minLength && value.length < 5) {
          obj[key] = role.message;
          return true;
        }
        if (role.Num_pat && !role.Num_pat.test(value)) {
          obj[key] = role.message;
          return true;
        }
      });
    });
    setError(obj);
    return obj;
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    if (Object.values(FormValidation(allData)).length) return;
    const yy = { ...allData };
    if (rowId) {
      updateText(rowId, { ...yy });
      allData.ProductName = "";
      allData.Color = "";
      allData.Category = "";
      allData.Price = "";
      setRowId("");
      return;
    }
    addText({ ...yy, id: crypto.randomUUID() });
    allData.ProductName = "";
    allData.Color = "";
    allData.Category = "";
    allData.Price = "";
  };
  const OnData = (e) => {
    const { value, name } = e.target;
    SetAllData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <form autoComplete="off" onSubmit={SubmitForm}>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Product
          </label>
          <input
            type="text"
            id="email"
            name="ProductName"
            value={allData.ProductName}
            onChange={OnData}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light focus:outline-none"
            placeholder="Enter Product Name"
          />
          {error.ProductName !== undefined && (
            <p className="absolute top-full text-sm left-1 text-red-500">
              {error.ProductName}
            </p>
          )}
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Color
          </label>
          <input
            type="text"
            name="Color"
            value={allData.Color}
            onChange={OnData}
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light focus:outline-none"
            placeholder="Enter Color Name"
          />
          {error.Color !== undefined && (
            <p className="absolute top-full text-sm left-1 text-red-500">
              {error.Color}
            </p>
          )}
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat Category
          </label>
          <select
            name="Category"
            value={allData.Category}
            onChange={OnData}
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="laptop pc">Laptop PC</option>
            <option value="accessories">Accessories</option>
          </select>
          {error.Category !== undefined && (
            <p className="absolute top-full text-sm left-1 text-red-500">
              {error.Category}
            </p>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Price
          </label>
          <input
            type="text"
            id="price"
            name="Price"
            value={allData.Price}
            onChange={OnData}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light focus:outline-none"
            placeholder="Enter Price"
          />
          {error.Price !== undefined && (
            <p className="absolute top-full text-sm left-1 text-red-500">
              {error.Price}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Register new account
        </button>
      </form>
    </>
  );
}

export default Form;
