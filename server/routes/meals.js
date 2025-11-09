const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MealLog = require("../models/MealLog");

const ObjectId = mongoose.Types.ObjectId;

// ------------------------------
// Create a new meal log
// ------------------------------
router.post("/create", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const newMealLog = new MealLog({
      userId,
      meals: [], // start empty
    });

    const savedMealLog = await newMealLog.save();

    res.status(201).json(savedMealLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------
// Add a meal to an existing log
// ------------------------------
router.post("/add-meal", async (req, res) => {
  try {
    const { mealLog_id, meal } = req.body;

    if (!mealLog_id || !meal) return res.status(400).json({ error: "Missing mealLog_id or meal" });

    // Ensure meal_id exists
    if (!meal.meal_id) meal.meal_id = new ObjectId().toString();

    const mealLog = await MealLog.findById(mealLog_id);
    if (!mealLog) return res.status(404).json({ error: "Meal log not found" });

    mealLog.meals.push(meal);
    const updatedMealLog = await mealLog.save();

    res.status(200).json(updatedMealLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------
// Delete a meal from a log
// ------------------------------
router.post("/del-meal", async (req, res) => {
  try {
    const { mealLog_id, meal_id } = req.body;

    if (!mealLog_id || !meal_id) return res.status(400).json({ error: "Missing mealLog_id or meal_id" });

    const mealLog = await MealLog.findById(mealLog_id);
    if (!mealLog) return res.status(404).json({ error: "Meal log not found" });

    // Remove the meal
    mealLog.meals = mealLog.meals.filter((m) => m.meal_id !== meal_id);

    const updatedMealLog = await mealLog.save();
    res.status(200).json(updatedMealLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------
// Fetch recent meal logs
// ------------------------------
router.post("/get-meals", async (req, res) => {
  try {
    const { userId, count } = req.body;

    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const limit = count || 7;

    const mealLogs = await MealLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({ mealLogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------
// Test route
// ------------------------------
router.get("/user", (req, res) => {
  res.send("respond with a resource");
});

module.exports = router;
