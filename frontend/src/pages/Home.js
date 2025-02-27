import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


//components
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  // const [workouts, setworkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/workouts`, {
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
    <div className="home">
      <WorkoutForm />
    </div>
  );
};

export default Home;
