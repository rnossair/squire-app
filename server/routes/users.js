const express = require('express');
const router = express.Router();

const User = require('../models/user');

// POST /api/users - Create a new user
router.post('/create', async (req, res) => {
  try {
    // 1. Create a new instance of the model with the request body data
    const newUser = new User({
      preferred_name: req.body.preferred_name,
      name: req.body.name,
      targetCalories: req.body.targetCalories,
      targetProtein: req.body.targetProtein,
      targetFat: req.body.targetFat,
      targetCarbs: req.body.targetCarbs,
      generalFoodPreference: req.body.generalFoodPreference || 'none',
      currentWeightKg: req.body.currentWeightKg || null,
      heightCm: req.body.heightCm || null,
      age: req.body.age,
      sex: req.body.sex
    });

    // 2. Save the new document to MongoDB
    const savedUser = await newUser.save();

    // 3. Respond with the created item
    res.status(201).json(savedUser);

  } catch (err) {
    // Handle validation or database errors
    res.status(400).json({ message: err.message });
  }
});

/* GET users listing. */
router.post('/get-user', async(req, res) => {
  const userId = req.body.userId;
  try {
    const foundUser = await User.findById(userId);

    res.json(foundUser);
  } catch (err) {
  // Handle validation or database errors
  res.status(400).json({ message: err.message });
  }
});

module.exports = router;
