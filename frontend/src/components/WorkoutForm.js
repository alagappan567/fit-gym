import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "react-modal";
import "../workoutform.css"; // Import the CSS file

Modal.setAppElement("#root"); // Necessary for accessibility

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("00:00");
  const [intensity, setIntensity] = useState(2); // Initial intensity set to "Medium"
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Set initial date to current date
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values:", { workoutType, duration, intensity, date });

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!workoutType || !duration || !intensity || !date) {
      setEmptyFields(["workoutType", "duration", "intensity", "date"]);
      setError("Please fill in all fields");
      return;
    }

    // Convert duration from "HH:MM" to total minutes
    const [hours, minutes] = duration.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const workout = { workoutType, duration: totalMinutes, intensity, date };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setWorkoutType("");
      setDuration("");
      setIntensity(2); // Reset intensity to "Medium"
      setDate(new Date().toISOString().slice(0, 10)); // Reset date to current date
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Workout type:</label>
        <select
          onChange={(e) => setWorkoutType(e.target.value)}
          value={workoutType}
          className={emptyFields.includes("workoutType") ? "error" : ""}
        >
          <option value="">Select workout type</option>
          <option value="Running">Running</option>
          <option value="Jogging">Jogging</option>
          <option value="Swimming">Swimming</option>
          <option value="Cycling">Cycling</option>
          <option value="Yoga">Yoga</option>
          <option value="Weightlifting">Weightlifting</option>
        </select>
        <label>Duration (HH:MM) </label>
        <input
          type="time"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          className={emptyFields.includes("duration") ? "error" : ""}
        />
        <label>Intensity ({getLabel(intensity)})</label>
        <input
          type="range"
          min="1"
          max="3"
          step="1"
          onChange={(e) => setIntensity(Number(e.target.value))}
          value={intensity}
          className={emptyFields.includes("intensity") ? "error" : ""}
        />
        <label>Date</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className={emptyFields.includes("date") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Workout Recorded"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Success</h2>
        <p>Your workout has been recorded</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default WorkoutForm;
