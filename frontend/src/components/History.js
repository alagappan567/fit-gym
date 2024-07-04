import React from "react";
import WorkDetails from "./WorkDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const History = () => {
  const { workouts } = useWorkoutsContext(); // Only need workouts, not dispatch
  const { user } = useAuthContext();

  return (
    <div className="history">
      <h2>Your Workout Records</h2>
      <div className="workouts">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p className="no-history">No workout record available.</p>
        )}
      </div>
    </div>
  );
};

export default History;
