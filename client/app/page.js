import Link from 'next/link';
import MacroRing from './Components/MacroRing';
import ThreeColumnSection from './Components/ThreeColumnSection';

export default function Home() {
  return (
    <div>
      {/* Hero — the thesis is the product's own surface: what's left of your day */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass">Your nutrition attendant</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Eat what you fancy.
            <br />
            <span className="text-squire">Squire keeps the tally.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Set your daily macros once. Ask for a meal, and Squire hands you a recipe that fits
            what&apos;s left — then logs it, so you never do the arithmetic.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-squire px-7 py-3.5 font-medium text-surface transition-colors hover:bg-squire-bright"
            >
              Open your dashboard
            </Link>
            <a href="#duties" className="text-ink-soft transition-colors hover:text-ink">
              See how it works →
            </a>
          </div>
        </div>

        {/* Signature preview */}
        <div className="relative">
          <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">What&apos;s left today</p>
            <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
              <MacroRing label="Calories" unit="kcal" remaining={1870} total={2500} color="#3e6b3c" size={168} stroke={15} big />
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
                <MacroRing label="Protein" unit="g" remaining={96} total={150} color="#b4552e" size={92} stroke={9} />
                <MacroRing label="Carbs" unit="g" remaining={140} total={250} color="#bf922c" size={92} stroke={9} />
                <MacroRing label="Fat" unit="g" remaining={38} total={70} color="#4e6e7a" size={92} stroke={9} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="duties" className="border-t border-line bg-canvas">
        <ThreeColumnSection />
      </div>

      {/* Closing */}
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink">Ready when you are.</h2>
          <Link
            href="/dashboard"
            className="rounded-full bg-squire px-7 py-3.5 font-medium text-surface transition-colors hover:bg-squire-bright"
          >
            Open your dashboard
          </Link>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <p className="font-display text-lg font-semibold text-squire">
            <span className="text-brass">[</span> Squire <span className="text-brass">]</span>
          </p>
          <p className="mt-1 text-sm text-ink-faint">Healthy eating, without the arithmetic.</p>
        </div>
      </footer>
    </div>
  );
}
