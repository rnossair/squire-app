'use client'; 

// import KnotapiJS from 'knotapi-js';
import React, { useState, useEffect } from 'react';
// import KnotapiJS  from 'knotapi-js';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- UTILITY FUNCTIONS ---

// 1. Calls Express to get the temporary session ID
const getKnotSessionId = async (userId) => {
    const response = await fetch(`https://squire-app.onrender.com/knot/session/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error('Failed to create Knot session ID.');
    const data = await response.json(); 
    return data.session;
};

// 2. Calls Express to exchange the publicToken for the permanent accessToken
const exchangePublicToken = async (publicToken, userId) => {
    const response = await fetch(`${API_BASE_URL}/api/knot/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicToken, userId }),
    });
    if (!response.ok) {
         const errorBody = await response.json();
         throw new Error(errorBody.message || 'Failed to exchange public token.');
    }
    return response.json();
};

// --- MAIN COMPONENT ---

export default function KnotLinkPage() {
    // --- State Management ---
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('ready'); // ready, linking, success, error
    const [error, setError] = useState(null);

    // --- EFFECTS ---

    // MOCK USER ID: Replace with a mechanism to get the actual logged-in user's ID
    const MOCK_USER_ID = "690fc7733d3f4948a7d89600"; 
    console.log(API_BASE_URL)
    // --- LINK HANDLER ---
    const handleLinkStart = async () => {
        setLoading(true);
        setStatus('linking');
        setError(null);

        try {
            // STEP 1: Get Session ID from Express Backend
            const sessionId = await getKnotSessionId(MOCK_USER_ID);

            // STEP 2: Initialize and Open the Widget
            KnotapiJS = window.KnotapiJS.default;
            const knotapi = new KnotapiJS();
            
            knotapi.open({
                sessionId: sessionId,
                clientId: process.env.NEXT_PUBLIC_KNOT_CLIENT_ID, 
                environment: 'development', 
                product: 'transaction_link', 
                
                // STEP 3: Handle Success - Public Token Received
                onSuccess: async (publicToken) => {
                    setStatus('exchanging');
                    setLoading(true);
                    
                    try {
                        // Call Express to exchange the publicToken for the permanent accessToken
                        await exchangePublicToken(publicToken, MOCK_USER_ID); 
                        setStatus('success');
                    } catch (err) {
                        setStatus('error');
                        setError(err.message);
                    } finally {
                        setLoading(false);
                    }
                },
                
                onExit: () => setLoading(false),
                onError: (err) => {
                    setError(`Knot Error: ${err.message}`);
                    setLoading(false);
                    setStatus('error');
                },
            });

        } catch (err) {
            setError(err.message);
            setLoading(false);
            setStatus('error');
        }
    };

    // --- RENDER ---
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <script src="https://unpkg.com/knotapi-js@next"></script>
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Link Merchant Accounts 🛒
                </h1>

                {/* Status Indicator */}
                <p className="mb-4 text-sm text-center font-medium">
                    Status: <span className={`p-1 rounded text-white ${
                        status === 'success' ? 'bg-green-500' : 
                        status === 'linking' || status === 'exchanging' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </p>

                {/* Conditional Rendering */}
                {status === 'success' ? (
                    <div className="text-center text-green-600 font-semibold">
                        ✅ Accounts successfully linked!
                    </div>
                ) : (
                    <button
                        onClick={handleLinkStart}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                            loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {loading ? 'Opening Secure Widget...' : 'Start Linking Process'}
                    </button>
                )}
                
                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                
            </div>
            <p className="mt-4 text-xs text-gray-500">
                You are securely linking as user ID: {MOCK_USER_ID}
            </p>
        </div>
    );
}

// You can learn more about managing complex data-fetching flows and state in React 
// components by watching this video. [How to use useState and useEffect in Next Js] (https://www.youtube.com/watch?v=RZiLHPChkgY)
// This video explains how to use useState and useEffect in Next.js, which are necessary for the client-side logic of the Knot API integration.