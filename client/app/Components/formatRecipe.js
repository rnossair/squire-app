'use client';
import React from 'react';

const MACRO_CHIPS = [
  { key: 'totalCalories', label: 'kcal', color: 'var(--color-cal)' },
  { key: 'proteinGrams', label: 'g protein', color: 'var(--color-protein)' },
  { key: 'carbGrams', label: 'g carbs', color: 'var(--color-carb)' },
  { key: 'fatGrams', label: 'g fat', color: 'var(--color-fat)' },
];

export const formatRecipe = (recipe) => {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-brass">Squire suggests</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{recipe.recipeName}</h3>
      </div>

      {/* Macros as readable chips */}
      <div className="flex flex-wrap gap-2">
        {MACRO_CHIPS.map(({ key, label, color }) => (
          <span
            key={key}
            className="inline-flex items-center gap-2 rounded-full bg-sunk px-3 py-1 text-sm text-ink"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden="true" />
            <span className="font-mono font-bold">{recipe[key]}</span>
            <span className="text-ink-soft">{label}</span>
          </span>
        ))}
      </div>

      <div className="rounded-xl border-l-2 border-brass bg-canvas px-4 py-3">
        <p className="text-sm font-medium text-ink">Why this fits</p>
        <p className="mt-1 text-sm text-ink-soft">{recipe.matchReason}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-medium text-ink">Ingredients</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-soft">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-ink">Method</p>
          <ol className="mt-2 list-inside list-decimal space-y-1.5 text-sm text-ink-soft">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.funFact && (
        <p className="text-sm text-ink-faint">
          <span className="font-medium text-ink-soft">Good to know — </span>
          {recipe.funFact}
        </p>
      )}
    </div>
  );
};
