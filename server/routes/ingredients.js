const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient');

// POST /api/users - Create a new ingredient
router.post('/create', async (req, res) => {
    try {
        // 1. Create a new instance of the model with the request body data
        const newIngredient = new Ingredient({
            userId: req.body.userId,
            source: req.body.source || 'manual',
            ingredientName: req.body.ingredientName,
            totalCalories: req.body.totalCalories,
            proteinGrams: req.body.proteinGrams,
            fatGrams: req.body.fatGrams,
            carbGrams: req.body.carbGrams,
        });

        // 2. Save the new document to MongoDB
        const savedIngredient = await newIngredient.save();

        // 3. Respond with the created item
        res.status(201).json(savedIngredient);

    } catch (err) {
        // Handle validation or database errors
        res.status(400).json({ message: err.message });
    }
});

/* GET users listing. */
router.get('/user', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
