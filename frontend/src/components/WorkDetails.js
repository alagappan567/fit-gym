import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";

const WorkDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const getLabel = (value) => {
    switch (value) {
      case 1:
        return "Slow";
      case 2:
        return "Medium";
      case 3:
        return "Intense";
      default:
        return "";
    }
  };

  const formattedDate = format(new Date(workout.date), "dd-MMMM-yyyy");

  return (
    <div className="workout-details">
      <h4>{workout.workoutType}</h4>
      <p>
        <strong>Duration:</strong> {workout.duration} minutes
      </p>
      <p>
        <strong>Intensity:</strong> {getLabel(workout.intensity)}
      </p>
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      {workout.caloriesBurned !== undefined && (
        <p>
          <strong>Calories Burned:</strong> {workout.caloriesBurned} Kcal
        </p>
      )}
      <p>
        Created{" "}
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkDetails;
