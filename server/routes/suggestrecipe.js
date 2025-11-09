
var GoogleGenAI = require("@google/genai").GoogleGenAI;

require('dotenv').config()
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEN_AI_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "you are a professional nutrionist and the user's ai assistant. The user wants to eat a healthy meal with chicken breast, not exceeding 700 calories, provide a recipe to him, also including nutritional information and a short snippet of how it would fit their health goals. don't add too much fluff, keep it concise but casual (not informal though)!",
  });
  return response.text
}

const suggestedRecipeSchema = {
    // 1. Define the overall type (always 'object' for structured data)
    type: "object", 

    // 2. Define the properties (the keys and their expected types)
    properties: {
        recipeName: { 
            type: "string", 
            description: "The name of the suggested recipe."
        },
        
        // Nutritional Data (Critical for your app's core logic)
        totalCalories: { 
            type: "integer", 
            description: "The calculated total calories for the full recipe."
        },
        proteinGrams: { 
            type: "integer", 
            description: "Total protein content in grams."
        },
        fatGrams: { 
            type: "integer", 
            description: "Total fat content in grams."
        },
        carbGrams: { 
            type: "integer", 
            description: "Total carbohydrate content in grams."
        },
        
        // User Experience/Engagement Fields
        ingredients: { 
            type: "array", 
            items: { type: "string" }, 
            description: "A list of the required ingredients."
        },
        instructions: { 
            type: "array", 
            items: { type: "string" }, 
            description: "A list of step-by-step cooking instructions."
        },
        matchReason: { 
            type: "string", 
            description: "A short, positive sentence explaining why this recipe was chosen based on the user's remaining macros, preferences, and taste. You can ignore the last two if you do not have sufficient data." 
        },
        funFact: { 
            type: "string", 
            description: "A short, engaging nutritional fact about one of the main ingredients in the recipe." 
        },
    },

    // 3. Define the required fields (ensures the AI doesn't skip them)
    required: [
        "recipeName", 
        "totalCalories", 
        "proteinGrams", 
        "carbGrams",
        "fatGrams",
        "ingredients",
        "instructions", 
        "matchReason", 
        "funFact"
    ]
};


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/suggest-meal', async (req, res) => {
    const { userId, remainingMacros, foodPreference } = req.body;
    
    // 1. Fetch data from your database (MOCK FOR HACKATHON)
    // Replace this with a real MongoDB query in your final hackathon version
    const availableIngredients = ['chicken', 'rice', 'broccoli', 'tomatoes', "lamb", "spinach", "farfalle"];
    // const recipeOptions = await db.collection('recipes').find({ /* simple filter */ }).limit(10).toArray();

    // 2. Construct the intelligent prompt
    // const prompt = `
    //     User has remaining macros: ${JSON.stringify(remainingMacros)}.
    //     User has ingredients: ${availableIngredients.join(', ')}.
    //     User preference: ${foodPreference}.
        
    //     Analyze the ${recipeOptions.length} recipes provided below. Select the SINGLE BEST recipe 
    //     that matches the user's preference AND fits the remaining macros most closely (protein priority). 
    //     Generate a fun nutritional fact about one of the main ingredients.
    //     Recipes to choose from: ${JSON.stringify(recipeOptions)}
    // `;
      const prompt = `
        User has remaining macros: ${JSON.stringify({calories: 700, protein: 60})}.
        User has ingredients: ${availableIngredients.join(', ')}.
        User preference: ${"The user prefers a low fat food, and also appreciates asian style cuisine."}.
        ou are a professional nutrionist and the user's ai assistant. The user wants to eat a healthy meal with chicken breast,
        not exceeding 700 calories, provide a recipe to him, also including nutritional information and a short snippet
        of how it would fit their health goals. 
        don't add too much fluff, keep it concise but casual (not informal though)!
    `;

    // 3. Call Gemini API with the required schema
    async function generateRecipe() {
      const response = await ai.models.generateContent({ 
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: suggestedRecipeSchema,
        }
      });
      return response
    }
    

    const aiResponse = await generateRecipe();
    
    // 4. Send the structured data back to the client
    res.status(200).json(JSON.parse(aiResponse.text));
});

module.exports = router;