const express = require('express');
const router = express.Router();

const MealLog = require('../models/mealLog');

// POST /api/users - Create a new meal log
router.post('/create', async (req, res) => {
    try {
        // 1. Create a new instance of the model with the request body data
        const newMealLog = new MealLog({
            userId: req.body.userId,
            meals: []
        });

        // 2. Save the new document to MongoDB
        const savedMeal = await newMealLog.save();

        // 3. Respond with the created item
        res.status(201).json(savedMeal);

    } catch (err) {
        // Handle validation or database errors
        res.status(400).json({ message: err.message });
    }
});

router.post('/add-meal', async (req, res) => {
    try {
        const { userId, meal } = req.body;

        // Find the meal log for the user
        const mealLog = await MealLog.findOne({ userId: userId });
        if (!mealLog) {
            return res.status(404).json({ message: 'Meal log not found for this user.' });
        }

        // Add the new meal to the meals array
        mealLog.meals.push(meal);

        // Save the updated meal log
        const updatedMealLog = await mealLog.save();

        // Respond with the updated meal log
        res.status(200).json(updatedMealLog);

    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
});

/* GET users listing. */
router.get('/user', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
