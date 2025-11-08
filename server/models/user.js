const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "John Doe", required: true },
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
    remainingCalories: { type: Number, default: this.targetCalories },
    remainingProtein: { type: Number, default: this.targetProtein },
    remainingFat: { type: Number, default: this.targetFat },
    remainingCarbs: { type: Number, default: this.targetCarbs },

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

module.exports = mongoose.model('User', UserSchema);