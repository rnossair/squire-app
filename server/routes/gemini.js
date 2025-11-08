
var GoogleGenAI = require("@google/genai").GoogleGenAI;

require('dotenv').config()
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEN_AI_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "you are a professional nutrionist and the user's ai assistant. The user wants to eat a healthy meal with chicken breast, not exceeding 700 calories, provide a recipe to him, also including nutritional information and a short snippet of how it would fit their health goals",
  });
  return response.text
}




var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let gem = await main();
//   res.json({"gemini_response": "PLACEHOLDER"});
  console.log(gem);
  res.send(gem);
});

module.exports = router;