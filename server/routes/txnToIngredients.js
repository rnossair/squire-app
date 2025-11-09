const router = require('express').Router();

var GoogleGenAI = require("@google/genai").GoogleGenAI;

require('dotenv').config()
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const txn_fetch = fetch("https://knot.tunnel.tel/transactions/sync", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ merchant_id: 40, limit: 25 })
}).then(response => response.json())
    .then(data => data.transactions)
    .then(txn => txn.filter(txn => txn.order_status == "COMPLETED"))
    .then(txn =>
    ({
        txn_products: txn.map(txn => (txn.products.map(prod => prod.name))).flat()
    }))
    // .then(txnData => {console.log(txnData.txn_products)})
    .catch(error => console.error('Error:', error));



const suggestedIngredientSchema = {
    type: "object",
    properties: {
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    ingredientName: { type: "string", description: "The name of the ingredient suitable for cooking." },
                    totalCalories: { type: "integer", description: "Estimated total calories for the ingredient." },
                    proteinGrams: { type: "integer", description: "Estimated protein content in grams." },
                    fatGrams: { type: "integer", description: "Estimated fat content in grams." },
                    carbGrams: { type: "integer", description: "Estimated carbohydrate content in grams." }
                }
            },
            description: "A list of ingredient names derived from the user's recent transactions, discard anything not considered suitable for cooking."
        },
    },
    required: [
        "products"
    ]
};

async function filterIngredients(fet_res) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Among the list of products, identify and extract only those that are suitable as cooking ingredients.
            List of products: ${fet_res.txn_products.join(', ')}.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: suggestedIngredientSchema,
        }
    });
    return response
}

router.post('/', async (req, res) => {
    const userId = req.body.userId;
    fetch_res = await txn_fetch;
    console.log(fetch_res);




    const aiResponse = await filterIngredients(fetch_res);

    const final_list = JSON.parse(aiResponse.text).products

    final_list.forEach(ingredient => {
        fetch('http://localhost:8000/ingredients/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId, // Replace with actual userId
                source: "DoorDash",
                ingredientName: ingredient.ingredientName,
                totalCalories: ingredient.totalCalories,
                proteinGrams: ingredient.proteinGrams,
                fatGrams: ingredient.fatGrams,
                carbGrams: ingredient.carbGrams
            })
        }).then(response => response.json())
          .then(data => console.log('Success:', data))
          .catch((error) => {
              console.error('Error:', error);
          });
    });

    res.send(final_list);
});

module.exports = router;