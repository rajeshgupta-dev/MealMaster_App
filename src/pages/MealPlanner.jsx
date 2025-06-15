import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { startOfWeek, format, addDays } from "date-fns";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UseAuth } from "../firebase/AuthContext";
import "../styles/meal-planner.css";

const getWeekDates = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

const MealPlanner = () => {
  const { user, foods } = UseAuth();
  const [weekMeals, setWeekMeals] = useState({});
  const [loading, setLoading] = useState(true);
  const weekDays = getWeekDates();
  const weekId = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchWeekMeals = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.uid, "mealPlans", weekId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setWeekMeals(snap.data());
      } else {
        const init = {};
        weekDays.forEach((day) => {
          init[format(day, "yyyy-MM-dd")] = [];
        });
        setWeekMeals(init);
      }

      setLoading(false);
    };

    fetchWeekMeals();
  }, [user, weekId]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const meal = foods?.find((m) => m.id === draggableId);
    if (!meal) return;

    const destDate = destination.droppableId;
    const newWeekMeals = { ...weekMeals };

    if (!newWeekMeals[destDate]) newWeekMeals[destDate] = [];

    const alreadyAdded = newWeekMeals[destDate].some((m) => m.id === meal.id);
    if (!alreadyAdded) {
      newWeekMeals[destDate].push(meal);
    }

    setWeekMeals(newWeekMeals);

    if (user) {
      const ref = doc(db, "users", user.uid, "mealPlans", weekId);
      await setDoc(ref, newWeekMeals);
    }
  };

  if (loading || !foods) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="meal-planner-wrapper">
      <h2 className="meal-planner-title">Weekly Meal Planner</h2>
      <div className="meal-planner-layout">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Available Meals */}
          <Droppable droppableId="meals" isDropDisabled={true}>
            {(provided) => (
              <div
                className="available-meals"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h4 className="available-meals-title">Available Meals</h4>
                {foods.map((meal, index) => (
                  <Draggable key={meal.id} draggableId={meal.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="meal-item"
                      >
                        {meal.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Weekly Days */}
          <div className="weekly-days-grid">
            {weekDays.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              return (
                <Droppable key={dateStr} droppableId={dateStr}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="day-column"
                    >
                      <div className="day-header">{format(day, "EEE")}</div>
                      {weekMeals[dateStr]?.map((meal, index) => (
                        <div key={meal.id} className="meal-assigned">
                          {meal.name}
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MealPlanner;
