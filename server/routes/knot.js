// routes/knot.js (Initial Setup)

const express = require('express');
const router = express.Router();
// Use a library like node-fetch or axios for API calls
const fetch = require('node-fetch').default;

// Assumes KNOT_CLIENT_ID and KNOT_SECRET are in process.env
const KNOT_API_BASE = 'https://development.knotapi.com'; 

// POST /api/knot/session/create
// Called by the Next.js frontend to get the sessionId
router.post('/session/create', async (req, res) => {
    try {
        const { userId } = req.body;
        
        // 1. Prepare the payload for Knot's /session/create endpoint
        // You typically send data like your product type and a client-side user ID
        const payload = {
            type: 'transaction_link', 
            // Optional: User identifier to link the session to your internal user
            external_user_id: userId, 
        };

        // 2. Call the Knot API to create the session
        const knotResponse = await fetch(`${KNOT_API_BASE}/session/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${process.env.KNOT_CLIENT_ID}:${process.env.KNOT_SECRET}`).toString('base64')}`,
                // // Authenticate the request with your secrets
                // 'X-Knot-Client-Id': process.env.KNOT_CLIENT_ID,
                // 'X-Knot-Secret': process.env.KNOT_SECRET,
            },
            body: JSON.stringify(payload),
        });

        const data = await knotResponse.json();

        if (knotResponse.ok && data.session) {
            // 3. Return the sessionId to the frontend
            res.status(200).json({ session: data.session });
        } else {
            // Handle Knot API specific errors
            res.status(400).json({ message: "Failed to generate Knot session.", details: data });
        }
    } catch (error) {
        console.error("Knot Session Creation Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;