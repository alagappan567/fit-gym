import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext();
export const workoutsReducer = (state, action) => {
  //here state is previous state value,here action is the object that we passed to dispatch function and that object has had a type property and payload
  switch (action.type) {
    case "SET_WORKOUTS": //Updating full array of workouts
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
export const WorkoutsContextProvider = ({ children }) => {
  //Here children property represents whatever the componenets WorkoutsContextProvider is accepting the props wraps
  const [state, dispatch] = useReducer(workoutsReducer, {
    //Reducer function,intial value for the state which is basicaaly any object with workouts property
    workouts: null,
  });
  // dispatch({type:'SET_WORKOUTS',payload:[{}{}]})
  //dispatch function the arugument inside it is caleled an action,when we call dispatch function our reducer function is invoked
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
      {/* i.e root App component in index.js */}
    </WorkoutsContext.Provider>
  );
};
