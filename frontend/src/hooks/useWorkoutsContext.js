import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";
export const useWorkoutsContext = () => {
  //Every time we want to use our workouts data we just invoke this useworkoutcontext hook and get that context value back
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }
  return context;
};
