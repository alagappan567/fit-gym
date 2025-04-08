import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./navbar";
import "./CaloriesLeft.css";

const CaloriesLeft = () => {
  const { user } = useAuthContext();
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [error, setError] = useState(null);
  const dailyCalorieGoal = 2000; // Default daily calorie goal

  useEffect(() => {
    const fetchTodaysMeals = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/meals?date=${today}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const meals = await response.json();
        const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
        setCaloriesConsumed(totalCalories);
      } catch (error) {
        setError("Error fetching meals");
      }
    };

    fetchTodaysMeals();
  }, [user]);

  const caloriesLeft = Math.max(0, dailyCalorieGoal - caloriesConsumed);

  return (
    <div>
      <Navbar />
      <div className="calories-left-container">
        <h2>Daily Calorie Goal: {dailyCalorieGoal} kcal</h2>
        <div className="calories-summary">
          <p>Calories Consumed Today: {caloriesConsumed} kcal</p>
          <h3>Calories Left: {caloriesLeft} kcal</h3>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CaloriesLeft;