import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { FaTrashAlt } from "react-icons/fa";
import "./WorkDetails.css"

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
      <p id="created-at">
        Created{" "}
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div className="grid">
        <p>
          <h4>{workout.workoutType}</h4>
        </p>
        <p>
          <strong>Duration:</strong> {workout.duration} minutes
        </p>
        <p>
          <strong>Intensity:</strong> {getLabel(workout.intensity)}
        </p>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Calories Burned:</strong> {workout.caloriesBurned || "N/A"}{" "}
          Kcal🔥
        </p>
        <FaTrashAlt className="delete-btn" onClick={handleClick} />
      </div>
    </div>
  );
};

export default WorkDetails;
