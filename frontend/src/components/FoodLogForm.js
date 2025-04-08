import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./navbar";
import "./FoodLogForm.css";

const FoodLogForm = ({ defaultMealType }) => {
  const { user } = useAuthContext();
  const [mealType, setMealType] = useState(defaultMealType || "");
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Debug log to verify user and token
    if (user) {
      console.log("User authenticated:", !!user);
      console.log("Token present:", !!user.token);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!mealType || !foodItem || !quantity || !calories || !date) {
      setError("Please fill in all fields");
      return;
    }

    const meal = {
      date,
      mealType,
      foodItem,
      quantity: Number(quantity),
      calories: Number(calories)
    };

    try {
      console.log("Making request with token:", user.token);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(meal)
      });

      const json = await response.json();
      console.log("Server response:", json);

      if (!response.ok) {
        setError(json.error || "Failed to log meal");
        return;
      }

      setFoodItem("");
      setQuantity("");
      setCalories("");
      setDate(new Date().toISOString().split("T")[0]);
      setError(null);
      setSuccess("Meal logged successfully!");
      
    } catch (error) {
      console.error("Error logging meal:", error);
      setError("Failed to log meal. Please try again.");
    }
  };

  return (
    <div>
      <div className="food-log-form">
        <h2>Log Your Meal</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              disabled={!!defaultMealType}
            >
              <option value="">Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          <div>
            <label>Food Item</label>
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Enter food item"
            />
          </div>
          <div>
            <label>Quantity (g or piece)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label>Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Enter calories"
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit">Add Meal</button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default FoodLogForm;