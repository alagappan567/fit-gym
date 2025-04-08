import { useState } from "react";
import FoodLogForm from "./FoodLogForm";
import Navbar from "./navbar";
import "./MealSelector.css";

const MealSelector = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleMealSelection = (mealType) => {
    setSelectedMeal(mealType);
  };

  return (
    <div>
      <Navbar />
      <div className="meal-selector">
        <h1 className="opacity">Select a Meal to Log</h1>
        <div className="meal-buttons">
          <button 
            className={`meal-btn ${selectedMeal === "Breakfast" ? "selected" : ""}`}
            onClick={() => handleMealSelection("Breakfast")}
          >
            🌅 Add Breakfast
          </button>
          <button 
            className={`meal-btn ${selectedMeal === "Lunch" ? "selected" : ""}`}
            onClick={() => handleMealSelection("Lunch")}
          >
            🌞 Add Lunch
          </button>
          <button 
            className={`meal-btn ${selectedMeal === "Dinner" ? "selected" : ""}`}
            onClick={() => handleMealSelection("Dinner")}
          >
            🌙 Add Dinner
          </button>
        </div>

        {selectedMeal && (
          <div className="food-log-form-container">
            <FoodLogForm defaultMealType={selectedMeal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSelector;