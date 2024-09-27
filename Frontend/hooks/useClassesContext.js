import { ClassesContext } from "../context/classesContext";
import { useContext } from "react";

export const useClassesContext = () => {
  const context = useContext(ClassesContext);

  if (!context) {
    throw Error(
      "useClassesContext must be used inside a ClassesContextProvider"
    );
  }

  return context;
};
