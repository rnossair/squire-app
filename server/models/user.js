const mongoose = require('mongoose');

const UserGoalSchema = new mongoose.Schema({
    // --- Authentication and Goal Settings (Static/Rarely Updated) ---
    userId: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true // Index for fast lookup by user ID
    },
    
    // Calculated Targets (The goal for the entire day)
    targetCalories: { type: Number, required: true },
    targetProtein: { type: Number, required: true },
    targetFat: { type: Number, required: true },
    targetCarbs: { type: Number, required: true },
    generalFoodPreference: { 
        type: String, 
        default: 'none' 
    },

    // --- Dynamic Daily Budget (CRITICAL for AI Input) ---
    // This is updated with every logged meal.
    remainingCalories: { type: Number, default: targetCalories },
    remainingProtein: { type: Number, default: targetProtein },
    remainingFat: { type: Number, default: targetFat },
    remainingCarbs: { type: Number, default: targetCarbs },

    // Last time the budget was reset (e.g., end of the day)
    lastResetDate: { type: Date, default: Date.now }, 

    // --- User Metrics (Used for TDEE Recalculation) ---
    currentWeightKg: { type: Number },
    heightCm: { type: Number },
    age: { type: Number },
    sex: { type: String, enum: ['male', 'female', 'other'] } 
}, { 
    timestamps: true 
});

module.exports = mongoose.model('UserGoal', UserGoalSchema);