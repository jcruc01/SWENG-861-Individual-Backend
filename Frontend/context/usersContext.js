import { createContext, useReducer } from "react";

export const UsersContext = createContext();

const SET_CURRENT_USER = "SET_CURRENT_USER";
const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

const currentUserReducer = (state, action) => {
  console.log("Reducer Action:", action);
  switch (action.type) {
    case SET_CURRENT_USER:
      return { user: action.payload };
    case CLEAR_CURRENT_USER:
      return { user: null };
    default:
      return state;
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, { user: null });

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
