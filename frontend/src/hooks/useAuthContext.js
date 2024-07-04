import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export const useAuthContext = () => {
  //Every time we want to use our workouts data we just invoke this useworkoutcontext hook and get that context value back
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
