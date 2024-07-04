import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
//   const data = await fetch(URL)
//     .then((res) => res.json())
//     .then((data) => data);

//components
import WorkoutForm from "../components/WorkoutForm";
import WorkDetails from "../components/WorkDetails";

const Home = () => {
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
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map(
            (
              workout //normal brackets not curly braces since we are returning some template
            ) => <WorkDetails key={workout._id} workout={workout} />
            // <p key={workout._id}>{workout.title}</p>
          )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
