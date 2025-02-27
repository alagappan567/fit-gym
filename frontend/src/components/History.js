import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkDetails from "./WorkDetails";
import { Link } from "react-router-dom";
import "./history.css"
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

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/workouts`, {
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
      <Navbar />
      <div className="historybody">
        <div className="work-container" id="history">
          <h1 className="opacity">Your Workout Records</h1>
          <div className="workouts">
            {workouts && workouts.length > 0 ? (
              workouts.map((workout) => (
                <WorkDetails key={workout._id} workout={workout} />
              ))
            ) : (
              <div>
                <p className="no-history">
                  You have no workout records.
                  <Link to="/" id="add">
                    <button id="history-btn">Click to add </button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
