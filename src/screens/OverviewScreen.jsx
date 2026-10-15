import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, AlertCircle, Clock, Award, Compass } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function OverviewScreen({ onNavigate, userProfile, planState }) {
  const currentReserve = planState.currentReserve || 42500;
  const targetCorpus = planState.targetCorpus || 1000000;
  const progressPercent = ((currentReserve / targetCorpus) * 100).toFixed(2);
  const monthlySip = planState.monthlySip || 2000;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Welcome & Discipline Section */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4">
        <div className="space-y-3 max-w-2xl">
          {/* Category Kicker */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
            <span>Student Portfolio Roadmap</span>
            <span>/</span>
            <span>Level 01-A</span>
            <span>/</span>
            <span className="text-[#8FA68C]">Foundation Phase</span>
          </div>

          <h2 className="text-sm font-semibold tracking-wide text-[#292330]/70">
            Good afternoon, {userProfile.name}
          </h2>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#292330] tracking-tight leading-[1.1]">
            Your future, one decision at a time.
          </h1>

          <p className="text-sm sm:text-base text-[#292330]/80 leading-relaxed font-sans pt-1">
            Small, consistent steps can add up over time. You are quietly building an independent financial future on an allowance of <span className="font-semibold text-[#292330] tnum">{formatINR(userProfile.allowance)} / month</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2.5 bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Build My Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center gap-2 bg-[#FAF6F0] hover:bg-[#C7D8C5]/30 border border-[#292330]/20 text-[#292330] px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            >
              <Compass className="w-4 h-4 text-[#292330]/70" />
              <span>Explore financial concepts</span>
            </button>
          </div>
        </div>

        {/* Discipline Score Card */}
        <div className="w-full lg:w-80 bg-[#FAF6F0] border border-[#292330]/15 rounded-xl p-5 shadow-moneta-card flex-shrink-0">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#292330]/65 uppercase tracking-wider mb-2">
            <span>Discipline Score</span>
            <span className="text-[#8FA68C] font-bold">Stage 1: Seeding</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#292330] font-sans tnum">92</span>
            <span className="text-sm font-medium text-[#292330]/50">/ 100</span>
          </div>

          <p className="text-xs text-[#292330]/75 leading-relaxed mt-2.5">
            Consistency rating based on 3 months of uninterrupted monthly ₹2,000 reserve allocations.
          </p>

          <div className="mt-4 pt-3 border-t border-[#292330]/10 flex items-center justify-between text-xs">
            <span className="text-[#292330]/70">Habit Continuity:</span>
            <span className="font-semibold text-[#292330]">100% on schedule</span>
          </div>
          <div className="w-full bg-[#292330]/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#8FA68C] h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </section>

      {/* Main Wealth Horizon Dossier Card */}
      <section className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-moneta-card relative overflow-hidden">
        {/* Subtle background architectural illustration */}
        <div className="absolute right-6 -bottom-6 opacity-[0.04] pointer-events-none select-none">
          <svg width="340" height="340" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 90 L90 90 L90 80 L10 80 Z M20 80 L20 40 L30 40 L30 80 Z M40 80 L40 40 L50 40 L50 80 Z M60 80 L60 40 L70 40 L70 80 Z M80 80 L80 40 L90 40 L90 80 Z M50 10 L10 40 L90 40 Z"/>
          </svg>
        </div>

        {/* Card Header Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#292330]/10">
          <div className="flex items-center gap-2">
            <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Active Horizon
            </span>
            <span className="text-xs text-[#292330]/70">
              Simulated compounding at 11.5% long-term index benchmark
            </span>
          </div>
          <button 
            onClick={() => onNavigate('learn')}
            className="text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] flex items-center gap-1 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data-backed methodology</span>
          </button>
        </div>

        {/* Center Target Corpus Display */}
        <div className="py-8 sm:py-10 text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] text-[#292330]/60 uppercase block">
            First Wealth Horizon (Target: Age 24)
          </span>
          <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#292330] tracking-tight tnum font-normal">
            {formatINR(targetCorpus)}
          </div>
          <p className="text-xs sm:text-sm text-[#292330]/75 leading-relaxed max-w-xl mx-auto pt-1 font-sans">
            A ₹10 Lakh corpus before entering your late twenties grants career autonomy, higher study leverage, and a resilient psychological buffer.
          </p>
        </div>

        {/* Status Metrics Bar */}
        <div className="bg-[#F3EBDD]/70 border border-[#292330]/10 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#292330]/60 text-[11px] uppercase tracking-wider block font-semibold">
                Current Vault Reserve
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#292330] tnum">
                {formatINR(currentReserve)}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[#292330]/60 text-[11px] uppercase tracking-wider block font-semibold">
                Path Status
              </span>
              <span className="text-base sm:text-lg font-bold text-[#8FA68C] tnum">
                {progressPercent}% Completed
              </span>
            </div>
          </div>

          {/* Visual Milestone Track */}
          <div className="space-y-2">
            <div className="w-full bg-[#292330]/10 h-2.5 rounded-full overflow-hidden flex">
              <div 
                className="bg-[#B86F52] h-full transition-all duration-500 rounded-full" 
                style={{ width: `${Math.max(4.25, progressPercent)}%` }}
              />
            </div>

            {/* Checkpoint labels */}
            <div className="grid grid-cols-3 text-[10px] sm:text-xs text-[#292330]/70 pt-1 font-medium">
              <div className="text-left flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B86F52]" />
                <span>₹50,000 Emergency Base (85% funded)</span>
              </div>
              <div className="text-center flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#292330]/40" />
                <span>₹2,50,000 Foundation Capital</span>
              </div>
              <div className="text-right flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA68C]" />
                <span>₹10,00,000 Corpus Target</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Contribution Architecture (3 Cards Grid) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
            Monthly Contribution Architecture
          </h2>
          <span className="text-xs font-semibold text-[#292330]/60">
            Calibrated for ₹8,000 monthly allowance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Monthly Allocation */}
          <div className="moneta-card p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#292330]/60 uppercase tracking-wider">
                  Monthly Allocation
                </span>
                <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded">
                  25% of allowance
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#292330] tnum">
                {formatINR(monthlySip)} <span className="text-xs font-normal text-[#292330]/60">/ month</span>
              </div>
              <p className="text-xs text-[#292330]/75 leading-relaxed pt-2">
                Balanced split: <strong className="text-[#292330]">₹500</strong> into an accessible emergency vault and <strong className="text-[#292330]">₹1,500</strong> routed systematically into a low-cost Nifty 50 broad index fund.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('plan')} 
              className="mt-4 pt-3 border-t border-[#292330]/10 text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] flex items-center justify-between transition-colors"
            >
              <span>Fine-tune allocation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Estimated Timeline */}
          <div className="moneta-card p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#292330]/60 uppercase tracking-wider">
                  Estimated Timeline
                </span>
                <span className="bg-[#FAF6F0] border border-[#292330]/15 text-[#292330] text-[10px] font-semibold px-2 py-0.5 rounded">
                  Steady Pacing (Age 19 to 25.5)
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#292330] tnum">
                6.5 Years
              </div>
              <p className="text-xs text-[#292330]/75 leading-relaxed pt-2">
                Accelerates as your income expands post-college. A modest step-up of 10% per year upon campus placement can compress this timeframe by almost <strong className="text-[#292330]">20 months</strong>.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('whatif')} 
              className="mt-4 pt-3 border-t border-[#292330]/10 text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] flex items-center justify-between transition-colors"
            >
              <span>Simulate step-up scenarios</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Compound Momentum */}
          <div className="moneta-card p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#292330]/60 uppercase tracking-wider">
                  Compound Momentum
                </span>
                <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded">
                  Pure compound earnings
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#8FA68C] tnum">
                ₹3,18,000+
              </div>
              <p className="text-xs text-[#292330]/75 leading-relaxed pt-2">
                The power of beginning at nineteen: nearly a third of your target corpus is generated by <strong className="text-[#292330]">reinvested gains</strong> rather than manual pocket deposits.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('journey')} 
              className="mt-4 pt-3 border-t border-[#292330]/10 text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] flex items-center justify-between transition-colors"
            >
              <span>View compounding curve</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Section: Plain Language Financial Literacy & Onboarding Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plain Language Financial Literacy (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF6F0] border border-[#292330]/15 rounded-xl p-6 sm:p-7 shadow-moneta-card space-y-5">
          <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FA68C]" />
              <span className="text-xs font-bold text-[#292330]/70 uppercase tracking-wider">
                Plain-Language Financial Literacy
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#292330]/50">Digest #14</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl text-[#292330]">
              Today’s Insight: What is an Index Fund?
            </h3>
            <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
              Instead of attempting to pick individual winning stocks like a lottery, an Index Fund lets you own a tiny slice of India’s top 50 growing enterprises (The NIFTY 50).
            </p>
          </div>

          {/* Reassurance Callout */}
          <div className="bg-[#C7D8C5]/30 border-l-4 border-[#8FA68C] p-4 rounded-r-lg space-y-1">
            <span className="text-xs font-bold text-[#292330] block">The Reassurance:</span>
            <p className="text-xs text-[#292330]/80 leading-relaxed">
              When one company has a slow quarter, others balance it out. Over 10-year rolling horizons, India’s core index has historically outpaced inflation reliably.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-bold text-[#B86F52] hover:text-[#A45F44] flex items-center gap-1.5 transition-colors"
            >
              <span>Read 2-min breakdown & comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dr. Priya Ramanathan Quote Card */}
          <div className="mt-4 pt-4 border-t border-[#292330]/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#292330] text-[#FAF6F0] flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
              PR
            </div>
            <div className="text-xs">
              <p className="italic text-[#292330]/85 font-display">
                “Wealth isn't about large sums — it's about outlasting the habit of asking your future self less.”
              </p>
              <span className="text-[10px] text-[#292330]/60 font-semibold block mt-0.5">
                Dr. Priya Ramanathan • Financial Wellness Educator
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Your Onboarding Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF6F0] border border-[#292330]/15 rounded-xl p-6 sm:p-7 shadow-moneta-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
            <span className="text-xs font-bold text-[#292330]/70 uppercase tracking-wider">
              Immediate Roadmap
            </span>
            <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded">
              Step 2 of 3 Active
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Step 1: Completed */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F3EBDD]/50 border border-[#292330]/5">
              <CheckCircle2 className="w-5 h-5 text-[#8FA68C] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#292330]">
                  Step 1: Complete student budget profile
                </span>
                <p className="text-[11px] text-[#292330]/70 leading-snug">
                  ₹8,000 monthly allowance identified. Essential expenses benchmarked at ₹5,500.
                </p>
              </div>
            </div>

            {/* Step 2: Active / In Progress */}
            <div 
              onClick={() => onNavigate('learn')}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF6F0] border-2 border-[#B86F52] cursor-pointer hover:bg-[#F3EBDD]/40 transition-colors shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-[#B86F52] text-[#FAF6F0] flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#292330]">
                    Step 2: Compare low-risk vs long-term growth
                  </span>
                  <span className="text-[9px] bg-[#B86F52] text-[#FAF6F0] px-1.5 py-0.2 rounded font-semibold uppercase">
                    In Progress
                  </span>
                </div>
                <p className="text-[11px] text-[#292330]/75 leading-snug">
                  Discover how a ₹500 safe deposit pairs with ₹1,500 index equity for student protection.
                </p>
              </div>
            </div>

            {/* Step 3: Upcoming */}
            <div 
              onClick={() => onNavigate('stress')}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#F3EBDD]/30 border border-[#292330]/10 cursor-pointer hover:bg-[#F3EBDD]/60 transition-colors"
            >
              <div className="w-5 h-5 rounded-full border border-[#292330]/40 text-[#292330]/60 flex items-center justify-center text-[11px] font-semibold flex-shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#292330]/80">
                    Step 3: Run your first stress test simulation
                  </span>
                  <span className="text-[9px] text-[#292330]/50 uppercase font-semibold">
                    Next Up
                  </span>
                </div>
                <p className="text-[11px] text-[#292330]/65 leading-snug">
                  Simulate unexpected laptop repairs or medical expenses without disrupting your corpus.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button 
              onClick={() => onNavigate('plan')}
              className="text-xs font-semibold text-[#292330]/70 hover:text-[#292330] flex items-center gap-1 justify-end transition-colors"
            >
              <span>View full wealth roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* Philosophy Anchor Banner */}
      <section className="bg-[#292330] text-[#FAF6F0] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-moneta-card">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C7D8C5] uppercase block">
            The Moneta Philosophy
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0] leading-snug">
            Wealth is grown in silence, not shouted in haste.
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/75 leading-relaxed font-sans">
            Moneta is built to shield students from gambling algorithms and get-rich-quick noise. Your ₹2,000 monthly allocation is your quiet foundation.
          </p>
        </div>

        <button
          onClick={() => onNavigate('plan')}
          className="bg-[#FAF6F0] hover:bg-[#C7D8C5] text-[#292330] px-6 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm flex-shrink-0"
        >
          Refine My ₹2,000 Allocation
        </button>
      </section>

    </div>
  );
}
