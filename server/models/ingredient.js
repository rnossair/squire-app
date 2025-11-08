const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
{
    // Reference to the user
    userId: {
        type: String,
        required: true,
        ref: 'UserGoal', // Reference the UserGoal model
        index: true 
    },
    
    // Type and Source of the ingredient (Important for logging external vs. home-cooked)
    source: { 
        type: String, 
        enum: ['other', 'DoorDash', 'UberEats', 'manual'], 
        default: "other",
        required: true
    },

    // Nutritional Details (Pulled from the Gemini response)
    ingredientName: { type: String, required: true },
    totalCalories: { type: Number, required: true },
    proteinGrams: { type: Number, default: 0, required: true },
    fatGrams: { type: Number, default: 0, required: true  },
    carbGrams: { type: Number, default: 0, required: true  },


}, {
    timestamps: true // Tracks when the meal was logged
});

module.exports = mongoose.model('Ingredient', ingredientSchema);