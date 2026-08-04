'use client'
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "../Components/Searchbar";
import BoxButton from "../Components/BoxButton";
import SearchResult from "../Components/SearchResult";
import { formatRecipe } from "../Components/formatRecipe";
import ScrollBox from "../Components/ScrollBox";
import MacroRing from "../Components/MacroRing";

const API = "https://squire-app.onrender.com";
const USER_ID = "69107e6f9c503029b94e791a";

// Sensible defaults so the rings render even if the backend is asleep.
const DEFAULT_TARGETS = { calories: 2500, protein: 150, carbs: 250, fat: 70 };

const MACROS = [
  { key: "calories", label: "Calories", unit: "kcal", color: "#3e6b3c" },
  { key: "protein", label: "Protein", unit: "g", color: "#b4552e" },
  { key: "carbs", label: "Carbs", unit: "g", color: "#bf922c" },
  { key: "fat", label: "Fat", unit: "g", color: "#4e6e7a" },
];

function isToday(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [targets, setTargets] = useState(DEFAULT_TARGETS);
  const [usingDefaults, setUsingDefaults] = useState(true);
  const [consumed, setConsumed] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  const [searchQuery, setSearchQuery] = useState("");
  const [resultText, setResultText] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchState, setSearchState] = useState("idle"); // idle | loading | done | error
  const [logging, setLogging] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [mealLogId, setMealLogId] = useState(null);

  // 1. User + targets
  useEffect(() => {
    fetch(`${API}/users/get-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        if (data?.targetCalories) {
          setTargets({
            calories: data.targetCalories,
            protein: data.targetProtein ?? DEFAULT_TARGETS.protein,
            carbs: data.targetCarbs ?? DEFAULT_TARGETS.carbs,
            fat: data.targetFat ?? DEFAULT_TARGETS.fat,
          });
          setUsingDefaults(false);
        }
      })
      .catch((err) => console.error("get-user failed", err));
  }, []);

  // 2. Today's consumed macros
  useEffect(() => {
    fetch(`${API}/meals/get-meals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, count: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const latest = data?.mealLogs?.[0];
        if (!latest || !isToday(latest.createdAt)) return;
        setMealLogId(latest._id);
        const totals = latest.meals.reduce(
          (acc, m) => ({
            calories: acc.calories + (m.totalCalories || 0),
            protein: acc.protein + (m.proteinGrams || 0),
            carbs: acc.carbs + (m.carbGrams || 0),
            fat: acc.fat + (m.fatGrams || 0),
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
        setConsumed(totals);
      })
      .catch((err) => console.error("get-meals failed", err));
  }, []);

  const remaining = {
    calories: Math.max(targets.calories - consumed.calories, 0),
    protein: Math.max(targets.protein - consumed.protein, 0),
    carbs: Math.max(targets.carbs - consumed.carbs, 0),
    fat: Math.max(targets.fat - consumed.fat, 0),
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setSearchState("loading");
    setCurrentRecipe(null);
    try {
      const res = await fetch(`${API}/recipes/suggest-meal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          query,
          remaningMacros: {
            remainingCalories: remaining.calories,
            remainingFats: remaining.fat,
            remainingCarbs: remaining.carbs,
            remainingProteins: remaining.protein,
          },
        }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setCurrentRecipe(data);
      setResultText(formatRecipe(data));
      setSearchState("done");
    } catch (err) {
      console.error("suggest-meal failed", err);
      setResultText(
        <p className="text-ink-soft">
          Squire couldn&apos;t reach the kitchen just now — {err.message}. Try asking again.
        </p>
      );
      setSearchState("error");
    }
  };

  // Add the suggested recipe to today: animate rings down, then persist. No reload.
  const addToToday = useCallback(async () => {
    if (!currentRecipe || logging) return;
    setLogging(true);

    // Optimistic, animated update of the rings.
    setConsumed((prev) => ({
      calories: prev.calories + (currentRecipe.totalCalories || 0),
      protein: prev.protein + (currentRecipe.proteinGrams || 0),
      carbs: prev.carbs + (currentRecipe.carbGrams || 0),
      fat: prev.fat + (currentRecipe.fatGrams || 0),
    }));

    try {
      let logId = mealLogId;
      if (!logId) {
        const resCreate = await fetch(`${API}/meals/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID }),
        });
        logId = (await resCreate.json())._id;
        setMealLogId(logId);
      }

      const meal = {
        mealType: currentRecipe.mealType || "lunch",
        source: currentRecipe.source || "home-cooked",
        meal_id: Date.now().toString(),
        mealName: currentRecipe.recipeName,
        totalCalories: currentRecipe.totalCalories,
        proteinGrams: currentRecipe.proteinGrams,
        carbGrams: currentRecipe.carbGrams,
        fatGrams: currentRecipe.fatGrams,
      };

      await fetch(`${API}/meals/add-meal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealLog_id: logId, meal }),
      });

      setHistoryRefresh((n) => n + 1);
      setSearchState("idle");
      setCurrentRecipe(null);
      setSearchQuery("");
    } catch (err) {
      console.error("log meal failed", err);
    } finally {
      setLogging(false);
    }
  }, [currentRecipe, logging, mealLogId]);

  const firstName = userData?.preferred_name || userData?.name;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Greeting */}
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">Your day</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
          {firstName ? `Good day, ${firstName}.` : "Good day."}
        </h1>
        <p className="mt-2 text-ink-soft">Here&apos;s what&apos;s left of your provisions.</p>
      </header>

      {/* Signature: what's left today */}
      <section className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">What&apos;s left today</h2>
          {usingDefaults && (
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-faint">
              default targets
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <MacroRing
            label="Calories"
            unit="kcal"
            remaining={remaining.calories}
            total={targets.calories}
            color={MACROS[0].color}
            size={200}
            stroke={16}
            big
          />
          <div className="grid grid-cols-3 gap-6">
            {MACROS.slice(1).map((m) => (
              <MacroRing
                key={m.key}
                label={m.label}
                unit={m.unit}
                remaining={remaining[m.key]}
                total={targets[m.key]}
                color={m.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ask Squire */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink">Ask your squire</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Tell Squire what you feel like — it&apos;ll suggest a meal that fits what&apos;s left.
        </p>
        <div className="mt-4 max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={() => handleSearch(searchQuery)}
          />
        </div>

        {searchState === "loading" && (
          <div className="mt-5 max-w-2xl animate-pulse rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div className="h-3 w-24 rounded bg-sunk" />
            <div className="mt-3 h-6 w-2/3 rounded bg-sunk" />
            <div className="mt-4 h-20 rounded bg-sunk" />
          </div>
        )}

        {searchState !== "loading" && resultText && (
          <div className="mt-5 max-w-2xl space-y-4">
            <SearchResult text={resultText} />
            {currentRecipe && (
              <button
                onClick={addToToday}
                disabled={logging}
                className="inline-flex items-center gap-2 rounded-full bg-squire px-5 py-2.5 font-medium text-surface transition-colors hover:bg-squire-bright disabled:opacity-60"
              >
                {logging ? "Adding…" : "Add to today"}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Recent days */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Recent days</h2>
        <ScrollBox userId={USER_ID} refreshSignal={historyRefresh} />
      </section>

      {/* Connect */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Connect</h2>
        <div className="max-w-md">
          <Link href="/knot-integration">
            <BoxButton
              title="Sync merchant data"
              description="Link your accounts so Squire learns from what you buy."
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 7h-9M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              }
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
