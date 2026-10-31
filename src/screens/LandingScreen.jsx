import React from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChartNoAxesCombined, CircleHelp, Compass, Leaf, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

const points = '0,138 38,132 75,134 110,119 147,124 183,102 220,108 257,82 294,89 331,62 368,68 405,43 442,48 480,21';

function GrowthChart() {
  return (
    <svg viewBox="0 0 480 170" role="img" aria-label="Illustrative steady growth chart" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8FA68C" stopOpacity=".32" />
          <stop offset="100%" stopColor="#8FA68C" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[35, 75, 115, 155].map((y) => <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="#292330" strokeOpacity=".08" strokeDasharray="3 6" />)}
      <polygon points={`0,170 ${points} 480,170`} fill="url(#growthFill)" className="chart-area" />
      <polyline points={points} fill="none" stroke="#789273" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="chart-line" />
      <circle cx="480" cy="21" r="5" fill="#B86F52" className="chart-dot" />
    </svg>
  );
}

export default function LandingScreen({ onEnter }) {
  return (
    <div className="landing-page min-h-screen overflow-hidden bg-[#F3EBDD] text-[#292330]">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Moneta home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#292330] text-[#FAF6F0]"><Wallet size={19} /></span>
          <span><span className="block font-display text-2xl leading-none">moneta</span><span className="mt-1 block text-[9px] font-bold tracking-[.2em] text-[#292330]/55">MONEY, WITH MEANING</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#292330]/70 md:flex">
          <a className="transition-colors hover:text-[#292330]" href="#approach">Our approach</a>
          <a className="transition-colors hover:text-[#292330]" href="#tools">What you can do</a>
          <a className="transition-colors hover:text-[#292330]" href="#principles">Principles</a>
        </nav>
        <button onClick={onEnter} className="group inline-flex items-center gap-2 rounded-full bg-[#292330] px-5 py-3 text-xs font-bold text-[#FAF6F0] transition hover:bg-[#3D3446] focus:outline-none focus:ring-2 focus:ring-[#B86F52] focus:ring-offset-2">
          Open my planner <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="landing-reveal relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#292330]/10 bg-[#FAF6F0] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#596e56] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#8FA68C] animate-pulse" /> A calmer way to build your future
            </div>
            <h1 className="max-w-2xl font-display text-[3.5rem] leading-[.98] tracking-[-.045em] sm:text-7xl lg:text-[5.35rem]">
              Make room for <em className="text-[#789273]">what matters.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#292330]/70 sm:text-lg sm:leading-8">
              A thoughtful place to understand your money, shape a plan, and keep moving toward the life you want—one small decision at a time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onEnter} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#B86F52] px-6 py-4 text-sm font-bold text-[#FAF6F0] shadow-[0_10px_24px_-12px_rgba(184,111,82,.7)] transition hover:-translate-y-0.5 hover:bg-[#A45F44] focus:outline-none focus:ring-2 focus:ring-[#292330] focus:ring-offset-2">
                Explore your money <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a href="#approach" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#292330]/15 bg-[#FAF6F0]/70 px-6 py-4 text-sm font-bold transition hover:bg-[#FAF6F0]">
                See how it works <ArrowDown size={15} />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 text-xs text-[#292330]/55">
              <span className="flex -space-x-2"><i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#F3EBDD] bg-[#C7D8C5] not-italic"><Leaf size={13} /></i><i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#F3EBDD] bg-[#E8C8B7] not-italic"><ShieldCheck size={13} /></i><i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#F3EBDD] bg-[#E8D9A9] not-italic"><Sparkles size={13} /></i></span>
              <span>Built for clarity, not pressure</span>
            </div>
          </div>

          <div className="landing-reveal landing-reveal-late relative mx-auto w-full max-w-[550px] lg:ml-auto">
            <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-[#D8DFC9]/65 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-[#E6C5B2]/55 blur-3xl" />
            <div className="relative rounded-[1.65rem] border border-[#292330]/10 bg-[#FAF6F0] p-5 shadow-[0_35px_80px_-42px_rgba(41,35,48,.35)] sm:p-7">
              <div className="flex items-center justify-between">
                <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#292330]/45">Your money, in perspective</p><p className="mt-1 font-display text-xl">A little progress, adding up.</p></div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#C7D8C5]/55 text-[#596e56]"><ChartNoAxesCombined size={19} /></span>
              </div>
              <div className="mt-7 flex items-end justify-between">
                <div><p className="text-xs text-[#292330]/55">Illustrative long-term view</p><p className="mt-1 font-display text-4xl tracking-tight">₹10,00,000</p></div>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#C7D8C5]/45 px-2.5 py-1.5 text-[10px] font-bold text-[#52694f]"><ArrowUpRight size={12} /> steady steps</span>
              </div>
              <div className="mt-5 h-40"><GrowthChart /></div>
              <div className="mt-1 flex justify-between border-t border-[#292330]/10 pt-3 text-[10px] font-medium text-[#292330]/45"><span>Today</span><span>With a plan</span><span>Your horizon</span></div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F3EBDD] p-3.5"><span className="text-[10px] text-[#292330]/55">Monthly rhythm</span><p className="mt-1 font-bold">Start where you are</p></div>
                <div className="rounded-xl bg-[#EDF0E8] p-3.5"><span className="text-[10px] text-[#292330]/55">Next step</span><p className="mt-1 flex items-center gap-1.5 font-bold"><span className="h-2 w-2 rounded-full bg-[#8FA68C]" /> Build a buffer</p></div>
              </div>
            </div>
            <div className="float-card absolute -left-8 top-[42%] hidden rounded-xl border border-[#292330]/10 bg-[#FAF6F0] px-4 py-3 shadow-lg sm:block">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#292330]/45">Your pace</p><p className="mt-1 text-xs font-bold">Consistent beats rushed.</p>
            </div>
          </div>
        </section>

        <section id="approach" className="border-y border-[#292330]/8 bg-[#FAF6F0]/65">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:grid-cols-3 sm:px-8">
            {[['01', 'See the whole picture', 'Bring your goals, savings, and monthly flow into one clear view.'], ['02', 'Choose your next step', 'Explore practical options at your own pace, with plain-language guidance.'], ['03', 'Adjust as life changes', 'Try scenarios and reshape your plan whenever your priorities shift.']].map(([number, title, copy]) => (
              <article key={number} className="flex gap-4">
                <span className="font-display text-2xl italic text-[#B86F52]">{number}</span>
                <div><h2 className="font-display text-xl">{title}</h2><p className="mt-1.5 max-w-xs text-xs leading-5 text-[#292330]/65">{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#B86F52]">A toolkit for real life</p><h2 className="mt-4 max-w-md font-display text-4xl leading-tight sm:text-5xl">Make your next money move with more confidence.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#292330]/65 lg:justify-self-end">Good financial habits are built in ordinary moments. Moneta helps you make those moments easier to see and easier to repeat.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Wallet, 'A plan that fits', 'Set a monthly rhythm around your real needs, with room to grow over time.', '#C7D8C5'],
              [Compass, 'Learn as you go', 'Get clear explanations of the ideas behind saving, investing, and risk.', '#E8D9A9'],
              [CircleHelp, 'Prepare for the unexpected', 'Explore “what if” moments and build a buffer that helps you feel ready.', '#E8C8B7'],
            ].map(([Icon, title, copy, color]) => <article key={title} className="rounded-2xl border border-[#292330]/10 bg-[#FAF6F0] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-25px_rgba(41,35,48,.3)]">
              <span style={{ backgroundColor: color }} className="grid h-11 w-11 place-items-center rounded-xl text-[#292330]"><Icon size={20} /></span>
              <h3 className="mt-5 font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#292330]/65">{copy}</p>
            </article>)}
          </div>
        </section>

        <section id="principles" className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] bg-[#292330] px-6 py-10 text-[#FAF6F0] sm:px-12 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#C7D8C5]">Our point of view</p><h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">You don’t need to have it all figured out to begin.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#FAF6F0]/65">Start with what you know. Ask better questions. Let your plan grow alongside you.</p></div>
              <button onClick={onEnter} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#C7D8C5] px-6 py-4 text-sm font-bold text-[#292330] transition hover:-translate-y-0.5 hover:bg-[#DDE8DB]">Take a look around <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#292330]/10 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[11px] text-[#292330]/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Moneta · Money, with meaning.</span>
          <span className="max-w-2xl leading-5"><ShieldCheck size={13} className="mr-1 inline text-[#789273]" />Educational planning only. Moneta does not provide personalized investment advice or execute transactions. Projections are illustrative, not guarantees.</span>
        </div>
      </footer>
    </div>
  );
}
