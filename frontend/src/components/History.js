import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkDetails from "./WorkDetails";
import "../index.css"
import Navbar from "./navbar";

const History = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        return;
      }

      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div>
      <Navbar/>
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
    </div>
  );
};

export default History;
