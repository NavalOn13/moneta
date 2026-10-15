import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Sparkles, AlertCircle, RefreshCw, Sliders, Info, Award } from 'lucide-react';
import { formatINR, calculateMonthsToTarget, calculateSipTrajectory } from '../utils/formatters';
import confetti from 'canvas-confetti';

export default function PlanScreen({ onNavigate, userProfile, planState, setPlanState }) {
  const [allowance, setAllowance] = useState(userProfile.allowance || 8000);
  const [committedExpenses, setCommittedExpenses] = useState(5500);
  const [monthlyContribution, setMonthlyContribution] = useState(planState.monthlySip || 2000);
  const [allocationRatio, setAllocationRatio] = useState(planState.allocationRatio || 80); // 80% Equity, 20% Liquid
  const [targetMilestone, setTargetMilestone] = useState(planState.targetCorpus || 1000000);
  const [annualStepUp, setAnnualStepUp] = useState(0.10); // 10% step up post-college
  const [savedNotification, setSavedNotification] = useState(false);

  // Dynamic calculations
  const equityShare = Math.round(monthlyContribution * (allocationRatio / 100));
  const liquidShare = monthlyContribution - equityShare;
  const unallocatedBuffer = allowance - committedExpenses - monthlyContribution;

  // Blended expected return based on allocation: Equity @ 12%, Liquid @ 6.5%
  const blendedRate = (allocationRatio / 100) * 0.12 + ((100 - allocationRatio) / 100) * 0.065;

  const projection = calculateMonthsToTarget(
    targetMilestone,
    planState.currentReserve || 42500,
    monthlyContribution,
    blendedRate,
    annualStepUp
  );

  const presets = [
    { label: 'Conservative', amount: 1000, desc: '12.5% of allowance' },
    { label: 'Balanced', amount: 1500, desc: '18.7% of allowance' },
    { label: 'Recommended', amount: 2000, desc: '25% of allowance' },
    { label: 'Max Capacity', amount: 2500, desc: '31% of allowance' },
  ];

  const handleSavePlan = () => {
    setPlanState(prev => ({
      ...prev,
      monthlySip: monthlyContribution,
      allocationRatio,
      targetCorpus: targetMilestone,
      estimatedYears: projection.years,
      estimatedMonths: projection.months,
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#292330', '#C7D8C5', '#B86F52', '#8FA68C']
      });
    } catch (e) {
      // Confetti fallback
    }

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 4000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
            <span>Capital Architecture</span>
            <span>/</span>
            <span>Step 2 of Wealth Journey</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[#292330] tracking-tight leading-[1.1]">
            Tailor your plan to your {formatINR(allowance)} allowance.
          </h1>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            Disciplined compounding without austerity. Adjust your monthly savings rate and see your estimated arrival date adjust in real time.
          </p>
        </div>

        {/* Profile Pill */}
        <div className="bg-[#FAF6F0] border border-[#292330]/15 px-4 py-3 rounded-xl shadow-sm text-right flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8FA68C]"></span>
            <span className="text-xs font-bold text-[#292330]">{userProfile.name} • B.Tech 2nd Year</span>
          </div>
          <span className="text-[11px] text-[#292330]/65 block mt-0.5">
            Monthly Inflow: <strong className="text-[#292330] tnum">{formatINR(allowance)}</strong>
          </span>
        </div>
      </section>

      {/* Main 2-Column Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section A: Monthly Budget Anatomy */}
          <section className="moneta-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
              <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
                Monthly Budget Anatomy
              </span>
              <span className="text-[10px] font-semibold text-[#8FA68C] uppercase tracking-wider">
                Fixed Net Inflow: {formatINR(allowance)}
              </span>
            </div>

            <p className="text-xs text-[#292330]/75">
              Guaranteed sanity before investing: your monthly ₹8,000 broke down into structural obligations and safe headroom.
            </p>

            {/* Visual 3-part budget progress bar */}
            <div className="w-full bg-[#292330]/10 h-3 rounded-full overflow-hidden flex">
              <div 
                className="bg-[#292330] h-full transition-all duration-300" 
                style={{ width: `${(committedExpenses / allowance) * 100}%` }}
                title="Essentials: ₹5,500"
              />
              <div 
                className="bg-[#C7D8C5] h-full transition-all duration-300" 
                style={{ width: `${(500 / allowance) * 100}%` }}
                title="Guilt-Free: ₹500"
              />
              <div 
                className="bg-[#B86F52] h-full transition-all duration-300" 
                style={{ width: `${(monthlyContribution / allowance) * 100}%` }}
                title={`Deployable SIP: ${formatINR(monthlyContribution)}`}
              />
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-3 rounded-lg bg-[#F3EBDD]/50 border border-[#292330]/10">
                <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Essentials</span>
                <span className="text-sm sm:text-base font-bold text-[#292330] tnum block mt-0.5">{formatINR(committedExpenses)}</span>
                <span className="text-[10px] text-[#292330]/60">Hostel, mess, books (69%)</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F3EBDD]/50 border border-[#292330]/10">
                <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Guilt-Free</span>
                <span className="text-sm sm:text-base font-bold text-[#292330] tnum block mt-0.5">₹500</span>
                <span className="text-[10px] text-[#292330]/60">Coffee, outings (6%)</span>
              </div>

              <div className="p-3 rounded-lg bg-[#C7D8C5]/40 border border-[#8FA68C]/40">
                <span className="text-[10px] text-[#292330]/75 uppercase font-bold block">Deployable SIP</span>
                <span className="text-sm sm:text-base font-bold text-[#B86F52] tnum block mt-0.5">{formatINR(monthlyContribution)}</span>
                <span className="text-[10px] text-[#292330]/70">Investing: {((monthlyContribution / allowance) * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="text-[11px] text-[#292330]/70 pt-1 flex items-center justify-between border-t border-[#292330]/5">
              <span>Committed Expenses: <strong className="text-[#292330]">{formatINR(committedExpenses)} / mo</strong></span>
              <span>Unallocated Buffer: <strong className="text-[#8FA68C]">{formatINR(Math.max(0, unallocatedBuffer))} unspent</strong></span>
            </div>
          </section>

          {/* Section B: Monthly Contribution Engine */}
          <section className="moneta-card p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider block">
                  Monthly Contribution Engine
                </span>
                <p className="text-xs text-[#292330]/70 mt-0.5">
                  Choose a recurring amount that allows you to sleep peacefully even during semester exams or trips home.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#292330] tnum">
                  {formatINR(monthlyContribution)}
                </span>
                <span className="text-xs text-[#292330]/60 block font-normal">/ month</span>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-3 pt-2">
              <input
                type="range"
                min="500"
                max="3500"
                step="250"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-[#292330]/60 font-medium">
                <span>₹500 (Base)</span>
                <span>₹1,500</span>
                <span className="font-bold text-[#B86F52]">₹2,000 (Current)</span>
                <span>₹3,500 (Max Capacity)</span>
              </div>
            </div>

            {/* Quick-Select Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {presets.map((p) => {
                const isSelected = monthlyContribution === p.amount;
                return (
                  <button
                    key={p.amount}
                    onClick={() => setMonthlyContribution(p.amount)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'bg-[#292330] text-[#FAF6F0] shadow-sm'
                        : 'bg-[#F3EBDD]/50 border border-[#292330]/10 hover:border-[#292330]/30 text-[#292330]'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold block opacity-75">{p.label}</span>
                    <span className="text-sm font-extrabold tnum block mt-0.5">{formatINR(p.amount)}</span>
                    <span className="text-[9px] opacity-70 block mt-0.5">{p.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Cash cushion reassurance note */}
            <div className="bg-[#C7D8C5]/30 border border-[#8FA68C]/30 p-3.5 rounded-lg flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8FA68C] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#292330]/80 leading-relaxed">
                <strong className="text-[#292330]">Cushion Preserved:</strong> At <span className="font-semibold">{formatINR(monthlyContribution)}/mo</span>, you maintain a <span className="font-semibold text-[#8FA68C]">{formatINR(Math.max(0, unallocatedBuffer))}</span> buffer every month for unexpected college expenses or canteen visits without ever touching your portfolio.
              </p>
            </div>
          </section>

          {/* Section C: Asset Allocation Architecture */}
          <section className="moneta-card p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
              <div>
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider block">
                  Asset Allocation Architecture
                </span>
                <span className="text-xs text-[#292330]/70 mt-0.5 block">
                  A dual-engine setup crafted specifically for students: one part botanical buffer, one part compounding powerhouse.
                </span>
              </div>
              <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {allocationRatio} / {100 - allocationRatio} Blueprint
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="w-full bg-[#292330]/10 h-3 rounded-full overflow-hidden flex">
              <div 
                className="bg-[#292330] h-full transition-all duration-300" 
                style={{ width: `${allocationRatio}%` }}
              />
              <div 
                className="bg-[#C7D8C5] h-full transition-all duration-300" 
                style={{ width: `${100 - allocationRatio}%` }}
              />
            </div>

            {/* The Dual Engines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Engine 1: Nifty 50 Equity */}
              <div className="p-4 rounded-xl bg-[#F3EBDD]/50 border border-[#292330]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#292330]">
                    {allocationRatio}% Long-Term Growth
                  </span>
                  <span className="text-xs font-extrabold text-[#B86F52] tnum">
                    {formatINR(equityShare)} / mo
                  </span>
                </div>
                <div className="text-[11px] text-[#292330]/75 space-y-1">
                  <div><strong>Instrument:</strong> Low-cost Nifty 50 Index Mutual Fund</div>
                  <div><strong>Target Engine:</strong> ~12.0% historical 10-year rolling CAGR</div>
                  <p className="pt-1 text-[#292330]/70 italic">
                    Direct growth vehicle for your ₹10L milestone. Weather short-term market dips without panicking.
                  </p>
                </div>
              </div>

              {/* Engine 2: Liquid Emergency Vault */}
              <div className="p-4 rounded-xl bg-[#C7D8C5]/20 border border-[#8FA68C]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#292330]">
                    {100 - allocationRatio}% Emergency Vault
                  </span>
                  <span className="text-xs font-extrabold text-[#292330] tnum">
                    {formatINR(liquidShare)} / mo
                  </span>
                </div>
                <div className="text-[11px] text-[#292330]/75 space-y-1">
                  <div><strong>Instrument:</strong> Institutional Liquid Fund / Auto-Sweep</div>
                  <div><strong>Yield:</strong> 6.50% p.a. stable returns</div>
                  <p className="pt-1 text-[#292330]/70 italic">
                    T+0 instant redemption for semester fees, broken laptop screen, or medical emergencies.
                  </p>
                </div>
              </div>

            </div>

            {/* Switch Preset Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-[#292330]/5 text-xs">
              <span className="text-[#292330]/60">Switch Blueprint Preset:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAllocationRatio(70)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    allocationRatio === 70 ? 'bg-[#292330] text-[#FAF6F0]' : 'bg-[#FAF6F0] border border-[#292330]/15'
                  }`}
                >
                  70 / 30 Defensive
                </button>
                <button
                  onClick={() => setAllocationRatio(80)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    allocationRatio === 80 ? 'bg-[#292330] text-[#FAF6F0]' : 'bg-[#FAF6F0] border border-[#292330]/15'
                  }`}
                >
                  80 / 20 Recommended
                </button>
                <button
                  onClick={() => setAllocationRatio(90)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    allocationRatio === 90 ? 'bg-[#292330] text-[#FAF6F0]' : 'bg-[#FAF6F0] border border-[#292330]/15'
                  }`}
                >
                  90 / 10 Aggressive
                </button>
              </div>
            </div>
          </section>

          {/* Section D: Target Corpus Milestone Setting */}
          <section className="moneta-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
                Target Corpus Milestone Setting
              </span>
              <span className="text-xs font-bold text-[#B86F52] tnum">
                Selected: {formatINR(targetMilestone)}
              </span>
            </div>

            <p className="text-xs text-[#292330]/75">
              Break an intimidating long-term summit into distinct psychological checkpoints:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setTargetMilestone(50000)}
                className={`p-3.5 rounded-lg text-left transition-all border ${
                  targetMilestone === 50000
                    ? 'border-[#292330] bg-[#FAF6F0] shadow-sm'
                    : 'border-[#292330]/10 bg-[#F3EBDD]/40 hover:border-[#292330]/30'
                }`}
              >
                <span className="text-[10px] font-bold text-[#292330]/60 uppercase block">Phase 01</span>
                <span className="text-lg font-bold text-[#292330] tnum block mt-0.5">₹50,000</span>
                <span className="text-[10px] text-[#292330]/70 block mt-1">Emergency Shield (Months 1-25)</span>
              </button>

              <button
                onClick={() => setTargetMilestone(250000)}
                className={`p-3.5 rounded-lg text-left transition-all border ${
                  targetMilestone === 250000
                    ? 'border-[#292330] bg-[#FAF6F0] shadow-sm'
                    : 'border-[#292330]/10 bg-[#F3EBDD]/40 hover:border-[#292330]/30'
                }`}
              >
                <span className="text-[10px] font-bold text-[#292330]/60 uppercase block">Phase 02</span>
                <span className="text-lg font-bold text-[#292330] tnum block mt-0.5">₹2,50,000</span>
                <span className="text-[10px] text-[#292330]/70 block mt-1">Foundation Capital (Month 42)</span>
              </button>

              <button
                onClick={() => setTargetMilestone(1000000)}
                className={`p-3.5 rounded-lg text-left transition-all border ${
                  targetMilestone === 1000000
                    ? 'border-2 border-[#B86F52] bg-[#FAF6F0] shadow-sm'
                    : 'border-[#292330]/10 bg-[#F3EBDD]/40 hover:border-[#292330]/30'
                }`}
              >
                <span className="text-[10px] font-bold text-[#B86F52] uppercase block">Final Horizon</span>
                <span className="text-lg font-bold text-[#292330] tnum block mt-0.5">₹10,00,000</span>
                <span className="text-[10px] text-[#292330]/70 block mt-1">Graduation & Early Career Goal</span>
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Live Projection Dossier (5 Cols, Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          
          <div className="moneta-card p-6 sm:p-7 shadow-moneta-card space-y-6">
            <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
              <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider">
                Simulated Trajectory • Age 19 to 25.5
              </span>
              <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded">
                Dynamic Real-Time
              </span>
            </div>

            <div>
              <span className="text-xs text-[#292330]/60 uppercase tracking-wider font-semibold block">
                Estimated Time to {formatINR(targetMilestone)} Target
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-5xl sm:text-6xl text-[#292330] font-normal tnum">
                  {projection.years}
                </span>
                <span className="text-2xl font-bold text-[#292330]/70 font-display">Years</span>
                <span className="text-xs text-[#292330]/50 font-medium">({projection.months} months)</span>
              </div>
              <p className="text-xs text-[#292330]/75 leading-relaxed mt-2 font-sans">
                Achieved with current <strong className="text-[#292330]">{formatINR(monthlyContribution)}/mo</strong> student savings, transitioning to a modest 10% annual step-up upon campus placement at age 21.
              </p>
            </div>

            {/* Roadmap to 10 Lakhs */}
            <div className="space-y-3 pt-3 border-t border-[#292330]/10">
              <span className="text-[11px] font-bold text-[#292330]/70 uppercase tracking-wider block">
                Roadmap to First 10 Lakhs (3 Milestones)
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8FA68C] mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold text-[#292330]">
                      <span>Month 25 (Age 21):</span>
                      <span className="tnum">₹50,000</span>
                    </div>
                    <span className="text-[11px] text-[#292330]/65 leading-tight block">
                      Emergency Shield fully capitalized before your final-year campus placement drive begins.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#292330]/40 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold text-[#292330]">
                      <span>Month 42 (Age 22.5):</span>
                      <span className="tnum">₹2,50,000</span>
                    </div>
                    <span className="text-[11px] text-[#292330]/65 leading-tight block">
                      Foundation Capital: Substantial early safety cushion accumulated before second career year.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#B86F52] mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold text-[#B86F52]">
                      <span>Month {projection.months} (Age {(19 + projection.years).toFixed(1)}):</span>
                      <span className="tnum">{formatINR(targetMilestone)}</span>
                    </div>
                    <span className="text-[11px] text-[#292330]/75 leading-tight block">
                      Corpus Target Unlocked: The hardest milestone is conquered; compounding now produces more return than your yearly deposits.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capital Composition Bar */}
            <div className="space-y-2 pt-3 border-t border-[#292330]/10">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#292330]/70">Capital Composition</span>
                <span className="text-[#8FA68C]">
                  {((projection.compoundGains / projection.finalValue) * 100).toFixed(0)}% Pure Compounding
                </span>
              </div>

              <div className="w-full bg-[#292330]/10 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-[#292330] h-full" 
                  style={{ width: `${(projection.totalDeposited / projection.finalValue) * 100}%` }}
                />
                <div 
                  className="bg-[#B86F52] h-full" 
                  style={{ width: `${(projection.compoundGains / projection.finalValue) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 text-xs pt-1">
                <div>
                  <span className="text-[#292330]/60 text-[10px] uppercase font-semibold block">Your Total Deposits</span>
                  <span className="font-bold text-[#292330] tnum">{formatINR(projection.totalDeposited)}</span>
                  <span className="text-[10px] text-[#292330]/50 block">Out-of-pocket</span>
                </div>
                <div className="text-right">
                  <span className="text-[#292330]/60 text-[10px] uppercase font-semibold block">Compounding Returns</span>
                  <span className="font-bold text-[#B86F52] tnum">{formatINR(projection.compoundGains)}</span>
                  <span className="text-[10px] text-[#8FA68C] block">Market growth</span>
                </div>
              </div>
            </div>

            {/* Reassurance Disclaimer */}
            <div className="bg-[#F3EBDD]/60 p-3 rounded-lg text-[10px] text-[#292330]/75 leading-relaxed">
              Calculated on disciplined consistency: Assumes index averages with 10% step-up after graduation. Does not rely on speculative stock picking or options trading.
            </div>

          </div>

          {/* Quick CTA to Stress Test */}
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#292330]/15 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#292330] block">Curious how a 20% crash affects this?</span>
              <span className="text-[11px] text-[#292330]/70">Run the crash simulator with your current allocation.</span>
            </div>
            <button
              onClick={() => onNavigate('stress')}
              className="text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] whitespace-nowrap pl-3"
            >
              Stress Test →
            </button>
          </div>

        </div>

      </div>

      {/* Transparent Financial Assumptions & Model Parameters */}
      <section className="bg-[#C7D8C5]/20 border border-[#8FA68C]/30 rounded-2xl p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8FA68C]" />
          <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
            Transparent Financial Assumptions & Model Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#292330]/80 pt-1">
          <div>
            <strong className="text-[#292330] block mb-0.5">Liquid Reserve Yield: 6.5% p.a.</strong>
            <span>Post-tax approx via Institutional Liquid Mutual Funds with T+0 instant redemptions.</span>
          </div>

          <div>
            <strong className="text-[#292330] block mb-0.5">Index CAGR Assumption: 12.0% p.a.</strong>
            <span>Nominal based on Nifty 50 20-year rolling returns; historical volatility factored in.</span>
          </div>

          <div>
            <strong className="text-[#292330] block mb-0.5">Step-up Architecture: 10% / year</strong>
            <span>Modest annual increase starting post-employment at age 21 to match entry-level increments.</span>
          </div>
        </div>

        <p className="text-[10px] text-[#292330]/60 pt-2 border-t border-[#292330]/10 italic">
          Educational decision-support model only. Not an offer of investment advisory or guaranteed returns. Projections are mathematical simulations based on historical benchmarks.
        </p>
      </section>

      {/* Sticky Bottom Action Deck */}
      <div className="sticky bottom-4 z-30 bg-[#292330] text-[#FAF6F0] p-4 sm:p-5 rounded-2xl shadow-moneta-modal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#B86F52] flex-shrink-0 animate-ping" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-[#FAF6F0]">
              {formatINR(monthlyContribution)} / month split into {allocationRatio}% Equity Index + {100 - allocationRatio}% Liquid Emergency Vault
            </span>
            <span className="text-[#FAF6F0]/70 text-xs block sm:inline sm:ml-2">
              • Estimated Arrival: {projection.years} Years to {formatINR(targetMilestone)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('stress')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-[#FAF6F0]/25 text-[#FAF6F0] hover:bg-[#FAF6F0]/10 text-xs font-semibold transition-colors"
          >
            Simulate Market Drops in Stress Test
          </button>

          <button
            onClick={handleSavePlan}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>{savedNotification ? 'Plan Saved!' : 'Lock & Save Plan →'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
