'use client'
import React, { useState, useEffect } from "react";

const CHIPS = [
  { key: "totalCalories", suffix: "kcal", color: "var(--color-cal)" },
  { key: "proteinGrams", suffix: "P", color: "var(--color-protein)" },
  { key: "carbGrams", suffix: "C", color: "var(--color-carb)" },
  { key: "fatGrams", suffix: "F", color: "var(--color-fat)" },
];

function relativeDay(dateStr, index) {
  if (!dateStr) return index === 0 ? "Today" : `Day ${index + 1}`;
  const d = new Date(dateStr);
  const today = new Date();
  const diff = Math.round((today.setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function ScrollBox({ userId, refreshSignal = 0 }) {
  const [mealLogs, setMealLogs] = useState(null); // null = loading

  useEffect(() => {
    if (!userId) return;
    let active = true;
    fetch("https://squire-app.onrender.com/meals/get-meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, count: 20 }),
    })
      .then((res) => res.json())
      .then((data) => active && setMealLogs(data.mealLogs || []))
      .catch(() => active && setMealLogs([]));
    return () => {
      active = false;
    };
  }, [userId, refreshSignal]);

  if (mealLogs === null) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 w-56 shrink-0 animate-pulse rounded-2xl bg-sunk" />
        ))}
      </div>
    );
  }

  if (mealLogs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-10 text-center">
        <p className="text-ink-soft">No meals logged yet.</p>
        <p className="mt-1 text-sm text-ink-faint">Ask Squire above, then add a meal to start your record.</p>
      </div>
    );
  }

  return (
    <div className="provision-scroll flex gap-4 overflow-x-auto pb-2">
      {mealLogs.map((mealLog, index) => (
        <div
          key={mealLog._id || index}
          className="flex w-64 shrink-0 flex-col rounded-2xl border border-line bg-surface p-4 shadow-sm"
        >
          <h3 className="font-display text-lg font-semibold text-ink">{relativeDay(mealLog.createdAt, index)}</h3>
          <div className="mt-3 flex flex-col gap-3">
            {mealLog.meals?.length ? (
              mealLog.meals.map((meal) => (
                <div key={meal.meal_id} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
                  <p className="text-sm font-medium text-ink">{meal.mealName}</p>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                    {CHIPS.map(({ key, suffix, color }) => (
                      <span key={key} className="inline-flex items-center gap-1 font-mono text-xs text-ink-soft">
                        <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />
                        {meal[key]}
                        {suffix === "kcal" ? " kcal" : suffix}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink-faint">No meals this day.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
