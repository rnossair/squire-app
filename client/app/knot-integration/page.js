'use client';
import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://squire-app.onrender.com';

// MOCK USER ID: replace with the actual logged-in user's ID.
const MOCK_USER_ID = '690fc7733d3f4948a7d89600';

const getKnotSessionId = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/knot/session/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to create Knot session.');
  const data = await response.json();
  return data.session;
};

const exchangePublicToken = async (publicToken, userId) => {
  const response = await fetch(`${API_BASE_URL}/api/knot/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicToken, userId }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Failed to exchange token.');
  }
  return response.json();
};

const STATUS_COPY = {
  ready: 'Not linked yet',
  linking: 'Opening secure widget…',
  exchanging: 'Confirming the link…',
  success: 'Linked',
  error: 'Something went wrong',
};

export default function KnotLinkPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('ready');
  const [error, setError] = useState(null);

  const handleLinkStart = async () => {
    setLoading(true);
    setStatus('linking');
    setError(null);

    try {
      const sessionId = await getKnotSessionId(MOCK_USER_ID);
      const KnotapiJS = window.KnotapiJS?.default;
      if (!KnotapiJS) throw new Error('Knot widget failed to load. Refresh and try again.');
      const knotapi = new KnotapiJS();

      knotapi.open({
        sessionId,
        clientId: process.env.NEXT_PUBLIC_KNOT_CLIENT_ID,
        environment: 'development',
        product: 'transaction_link',
        merchantIds: [36],
        onSuccess: async (publicToken) => {
          setStatus('exchanging');
          setLoading(true);
          try {
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
          setError(`Knot error: ${err.message}`);
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

  const statusTone =
    status === 'success'
      ? 'bg-squire text-surface'
      : status === 'error'
      ? 'bg-protein text-surface'
      : status === 'linking' || status === 'exchanging'
      ? 'bg-brass text-surface'
      : 'bg-sunk text-ink-soft';

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16">
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://unpkg.com/knotapi-js@next" async />

      <div className="w-full rounded-3xl border border-line bg-surface p-8 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">Connect</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Link your accounts</h1>
        <p className="mt-2 text-ink-soft">
          Connect a merchant so Squire can learn from what you actually buy.
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm">
          <span className="text-ink-soft">Status</span>
          <span className={`rounded-full px-3 py-1 font-medium ${statusTone}`}>
            {STATUS_COPY[status]}
          </span>
        </div>

        {status === 'success' ? (
          <p className="mt-6 rounded-xl bg-canvas px-4 py-3 text-squire">
            Your account is linked. Squire will start using your purchases.
          </p>
        ) : (
          <button
            onClick={handleLinkStart}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-squire py-3.5 font-medium text-surface transition-colors hover:bg-squire-bright disabled:opacity-60"
          >
            {loading ? 'Opening…' : 'Link an account'}
          </button>
        )}

        {error && <p className="mt-4 text-sm text-protein">{error}</p>}
      </div>
    </main>
  );
}
