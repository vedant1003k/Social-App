import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContex = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    if (state.user) {
      const { password, ...userWithoutPassword } = state.user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };


  return (
    <AuthContex.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContex.Provider>
  );
};
