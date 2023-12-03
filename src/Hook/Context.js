import { createContext, useContext } from "react";

export const TextContext = createContext([
  {
    ProductName: "",
    Color: "",
    Category: "",
    Price: "",
    addText: () => {},
    deleteText: () => {},
    updateText: () => {},
  },
]);

export const TextProvider = TextContext.Provider;

export const useText = () => useContext(TextContext);
