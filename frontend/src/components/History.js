import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkDetails from "./WorkDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const History = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  // const [workouts, setworkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json }); //opayload:json=full array of workouts
        // setworkouts(json);
      }
    };
    if (user) {
      fetchWorkouts();
    }
    // fetchWorkouts();
  }, [dispatch, user]);
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
