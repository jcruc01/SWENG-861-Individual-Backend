import { createContext, useReducer } from "react";

export const ClassesContext = createContext();

export const classesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSES":
      return {
        classes: action.payload,
      };
    case "CREATE_CLASS":
      return {
        classes: [action.payload, ...state.classes],
      };
    default:
      return state;
  }
};

export const ClassesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classesReducer, {
    classes: [],
  });

  return (
    <ClassesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassesContext.Provider>
  );
};
