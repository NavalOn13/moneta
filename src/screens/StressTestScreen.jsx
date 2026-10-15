import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, AlertTriangle, TrendingDown, ArrowRight, TrendingUp, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function StressTestScreen({ onNavigate, userProfile, planState }) {
  const [selectedScenario, setSelectedScenario] = useState('bear'); // 'correction', 'bear', 'crash'

  const totalDeposited = planState.currentReserve || 42500;
  const equityRatio = (planState.allocationRatio || 80) / 100;
  const liquidRatio = 1 - equityRatio;

  const liquidVault = Math.round(totalDeposited * liquidRatio);
  const equityInvested = totalDeposited - liquidVault;

  const scenarios = {
    baseline: {
      id: 'baseline',
      dropPercent: 0,
      label: '0% Normal Baseline',
      title: 'Calm Market Environment',
      duration: 'Ongoing',
      recoveryTime: '0 months',
      desc: 'Normal index trajectory compounding steadily at ~12% nominal CAGR.',
      unitBonus: 0,
    },
    correction: {
      id: 'correction',
      dropPercent: 10,
      label: '-10% Routine Correction',
      title: 'Healthy Market Pullback',
      duration: '2 to 4 months',
      recoveryTime: '5 months',
      desc: 'Typical annual market breath occurring ~1.2 times per year on average.',
      unitBonus: 11.1,
    },
    bear: {
      id: 'bear',
      dropPercent: 20,
      label: '-20% Bear Market',
      title: 'Cyclical Economic Contraction',
      duration: '8 to 12 months',
      recoveryTime: '11 months',
      desc: 'E.g., 2011 inflation spike, 2015 China taper tantrum. Recovers through normal earnings growth.',
      unitBonus: 25.0,
    },
    crash: {
      id: 'crash',
      dropPercent: 35,
      label: '-35% Black Swan Event',
      title: 'Deep Panic Shock',
      duration: '12 to 24 months',
      recoveryTime: '19 months',
      desc: 'Extreme shock like 2008 Global Financial Crisis or March 2020 Covid freeze.',
      unitBonus: 53.8,
    },
  };

  const active = scenarios[selectedScenario] || scenarios.bear;
  
  // Calculations
  const paperEquityValue = Math.round(equityInvested * (1 - active.dropPercent / 100));
  const paperPortfolioValue = liquidVault + paperEquityValue;
  const paperDrawdown = totalDeposited - paperPortfolioValue;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
            <span>Portfolio Resilience Laboratory</span>
            <span>/</span>
            <span>Step 4 of Wealth Mastery</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[#292330] tracking-tight leading-[1.1]">
            Simulating the storm: how market downturns test your wealth plan.
          </h1>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            Market drawdowns are the fee for entry to long-term compounding, not a penalty. Test how Aarav’s <strong className="text-[#292330] tnum">{formatINR(totalDeposited)}</strong> portfolio and ongoing <strong className="text-[#292330] tnum">{formatINR(planState.monthlySip || 2000)}/mo</strong> allocation weather historical corrections without panic.
          </p>
        </div>

        {/* Profile Baseline Badge */}
        <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl text-right flex-shrink-0 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">Portfolio Baseline</span>
          <div className="text-sm font-bold text-[#292330] tnum">
            {formatINR(totalDeposited)} invested
          </div>
          <span className="text-[11px] text-[#292330]/70 block">
            {planState.allocationRatio || 80}% Nifty 50 + {100 - (planState.allocationRatio || 80)}% Liquid Vault
          </span>
        </div>
      </section>

      {/* Module 1: Historical Crash Scenario Selector */}
      <section className="moneta-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#292330]/10 pb-3">
          <div>
            <span className="text-xs font-bold text-[#292330] uppercase tracking-wider block">
              Select a Historical Downturn Benchmark
            </span>
            <span className="text-xs text-[#292330]/65">
              Simulate realistic Dalal Street drawdowns and observe your actual risk exposure:
            </span>
          </div>

          {selectedScenario !== 'baseline' && (
            <button
              onClick={() => setSelectedScenario('baseline')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B86F52] hover:text-[#A45F44] transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Calm Baseline</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {['correction', 'bear', 'crash'].map((key) => {
            const sc = scenarios[key];
            const isSelected = selectedScenario === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`p-5 rounded-xl text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#292330] text-[#FAF6F0] shadow-md ring-2 ring-[#B86F52]'
                    : 'bg-[#F3EBDD]/60 border border-[#292330]/15 hover:border-[#292330]/35 text-[#292330]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#B86F52] text-[#FAF6F0] px-2 py-0.5 rounded-full uppercase">
                    Active
                  </span>
                )}
                <span className={`text-xs font-bold uppercase tracking-wider block ${isSelected ? 'text-[#C7D8C5]' : 'text-[#B86F52]'}`}>
                  {sc.label}
                </span>
                <h4 className="font-display text-lg mt-1 font-medium">
                  {sc.title}
                </h4>
                <p className={`text-xs leading-relaxed mt-2 ${isSelected ? 'text-[#FAF6F0]/80' : 'text-[#292330]/75'}`}>
                  {sc.desc}
                </p>
                <div className={`mt-3 pt-3 border-t text-[11px] font-medium flex justify-between ${isSelected ? 'border-[#FAF6F0]/15 text-[#FAF6F0]/70' : 'border-[#292330]/10 text-[#292330]/60'}`}>
                  <span>Avg Duration: {sc.duration}</span>
                  <span>Recovery: {sc.recoveryTime}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Module 2: Dynamic Impact Dossier (3 Cards Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Out-of-pocket Capital */}
        <div className="moneta-card p-6 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">
              Total Hard Cash Deposited
            </span>
            <div className="text-3xl font-extrabold text-[#292330] tnum mt-1">
              {formatINR(totalDeposited)}
            </div>
            <span className="text-xs text-[#292330]/65 block mt-0.5">
              Accumulated student savings
            </span>
          </div>

          <div className="bg-[#F3EBDD] p-3 rounded-lg text-[11px] text-[#292330]/80 border border-[#292330]/5">
            <strong>100% Unborrowed:</strong> Funded entirely via monthly allowance. Zero debt risk or leverage margins.
          </div>
        </div>

        {/* Card 2: Paper Portfolio Value During Dip */}
        <div className="moneta-card p-6 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider">
                Paper Valuation During Dip
              </span>
              {active.dropPercent > 0 && (
                <span className="bg-[#B86F52] text-[#FAF6F0] text-[10px] font-bold px-2 py-0.5 rounded">
                  -{active.dropPercent}% Peak
                </span>
              )}
            </div>
            <div className="text-3xl font-extrabold text-[#292330] tnum mt-1">
              {formatINR(paperPortfolioValue)}
            </div>
            <span className="text-xs text-[#292330]/65 block mt-0.5">
              Temporary mark-to-market dip of <strong className="text-[#B86F52] tnum">-{formatINR(paperDrawdown)}</strong>
            </span>
          </div>

          <div className="bg-[#FAF6F0] p-3 rounded-lg text-[11px] text-[#292330]/80 border border-[#292330]/10 space-y-1">
            <div className="flex justify-between">
              <span>Liquid Vault (Safe):</span>
              <strong className="text-[#8FA68C]">{formatINR(liquidVault)} untouched</strong>
            </div>
            <div className="flex justify-between">
              <span>Equity Index (Mark-to-Market):</span>
              <strong className="text-[#292330]">{formatINR(paperEquityValue)}</strong>
            </div>
          </div>
        </div>

        {/* Card 3: Realized Loss vs Paper Loss */}
        <div className="moneta-card p-6 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">
              Actual Realized Loss
            </span>
            <div className="text-3xl font-extrabold text-[#8FA68C] tnum mt-1">
              ₹0 Realized Loss
            </div>
            <span className="text-xs text-[#8FA68C] font-semibold block mt-0.5">
              Unless you hit panic-sell
            </span>
          </div>

          <div className="bg-[#C7D8C5]/30 p-3 rounded-lg text-[11px] text-[#292330]/85 border border-[#8FA68C]/30 leading-relaxed">
            You still hold <strong>100% of your mutual fund units</strong>. No company shut down, and your ownership percentage didn’t decrease.
          </div>
        </div>

      </section>

      {/* Module 3: Psychological Anchor & Reality Check (Dual Cards) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: The Liquid Shield Guarantee */}
        <div className="bg-[#C7D8C5]/20 border border-[#8FA68C]/40 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#8FA68C]" />
            <h3 className="font-display text-2xl text-[#292330]">
              The Liquid Shield Guarantee
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            Aarav’s <strong className="text-[#292330]">{100 - (planState.allocationRatio || 80)}% Emergency Reserve ({formatINR(liquidVault)})</strong> is stored safely in an Institutional Liquid Fund / High-Yield Auto-Sweep.
          </p>

          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#292330]/10 space-y-2 text-xs">
            <span className="font-bold text-[#292330] block">Absolute Insulation:</span>
            <p className="text-[#292330]/75 leading-relaxed">
              Even if Dalal Street suffers a 2008-scale crash tomorrow, your textbook fees, semester canteen dues, or laptop repairs remain <strong className="text-[#292330]">100% protected with zero stock market exposure</strong>.
            </p>
          </div>
        </div>

        {/* Right Card: Rupee Cost Averaging: The Silver Lining */}
        <div className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-[#B86F52]" />
            <h3 className="font-display text-2xl text-[#292330]">
              Rupee Cost Averaging: The Silver Lining
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            When the Nifty 50 drops by <strong className="text-[#B86F52]">{active.dropPercent}%</strong>, your regular <strong className="text-[#292330]">{formatINR(Math.round((planState.monthlySip || 2000) * equityRatio))} monthly equity SIP</strong> buys more mutual fund units every single month at a discount.
          </p>

          {/* Unit Comparison Stat */}
          <div className="bg-[#F3EBDD] p-4 rounded-xl border border-[#292330]/10 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#292330]/10">
              <span className="text-[#292330]/70">Standard Market NAV (₹100):</span>
              <strong className="text-[#292330]">16.0 Units acquired</strong>
            </div>
            <div className="flex justify-between items-center text-[#B86F52] font-bold">
              <span>Discounted Dip NAV (₹{100 - active.dropPercent}):</span>
              <span>{(16 / (1 - active.dropPercent / 100)).toFixed(1)} Units (+{active.unitBonus.toFixed(0)}% Bonus Units!)</span>
            </div>
            <p className="text-[11px] text-[#292330]/70 italic pt-1">
              When the market eventually rebounds, these extra units turbocharge your journey toward ₹10,00,000.
            </p>
          </div>
        </div>

      </section>

      {/* Module 4: Visual Drawdown & Recovery Trajectory Chart */}
      <section className="moneta-card p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#292330]/10 pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">
              Behavioral Divergence Modeling
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
              The Divergence: Panic-Selling vs. Disciplined Continuation
            </h2>
          </div>
          <div className="text-xs text-[#292330]/70">
            Simulated 24-month recovery cycle
          </div>
        </div>

        {/* SVG Curve Comparison */}
        <div className="p-4 sm:p-6 bg-[#F3EBDD]/40 rounded-xl border border-[#292330]/10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold mb-4">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#B86F52]">
                <span className="w-3 h-1 bg-[#B86F52] rounded"></span>
                <span>Disciplined Student (Continues ₹2,000/mo SIP)</span>
              </span>
              <span className="flex items-center gap-2 text-[#292330]/50">
                <span className="w-3 h-0.5 bg-[#292330]/40 rounded stroke-dashed"></span>
                <span>Panic Seller (Exits at trough)</span>
              </span>
            </div>
            <span className="text-[11px] text-[#8FA68C] font-bold">
              Recovery in Month {active.recoveryTime}
            </span>
          </div>

          <svg className="w-full h-48 sm:h-56 overflow-visible" viewBox="0 0 600 180">
            {/* Gridlines */}
            <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(41, 35, 48, 0.15)" strokeWidth="1" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(41, 35, 48, 0.08)" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(41, 35, 48, 0.08)" strokeDasharray="3 3" />

            {/* Panic Seller: Drops and flatlines */}
            <path 
              d={`M 0 60 Q 150 145 250 145 L 600 145`} 
              fill="none" 
              stroke="rgba(41, 35, 48, 0.35)" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />

            {/* Disciplined Student: Drops, accumulates extra units, rebounds strongly higher */}
            <path 
              d={`M 0 60 Q 150 145 260 145 Q 400 80 600 25`} 
              fill="none" 
              stroke="#B86F52" 
              strokeWidth="3.5" 
            />

            {/* Checkpoints */}
            <circle cx="250" cy="145" r="4" fill="#292330" />
            <text x="210" y="165" fontSize="10" fill="#292330" fontWeight="600">Trough ({active.dropPercent}%)</text>

            <circle cx="430" cy="85" r="4" fill="#8FA68C" />
            <text x="400" y="70" fontSize="10" fill="#8FA68C" fontWeight="700">Break-even (Mo 11)</text>

            <circle cx="600" cy="25" r="5" fill="#B86F52" />
            <text x="520" y="20" fontSize="11" fill="#B86F52" fontWeight="700">+34% Surge (Mo 24)</text>

            <text x="500" y="140" fontSize="10" fill="rgba(41, 35, 48, 0.6)">Permanent -{formatINR(paperDrawdown)} Loss</text>
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#292330]/10 text-xs">
            <div className="text-left text-[#292330]/75">
              <strong className="text-[#292330] block">The Panic Trap:</strong>
              Selling at the bottom permanently locks in paper losses and postpones Aarav's ₹10 Lakh corpus by <strong>over 4 years</strong>.
            </div>
            <div className="text-left text-[#292330]/75">
              <strong className="text-[#8FA68C] block">The Compounding Advantage:</strong>
              Continuing through the dip buys bargain units that surge when the market resumes its long-term trajectory.
            </div>
          </div>
        </div>
      </section>

      {/* Module 5: Action Deck & Simulation Bridging */}
      <section className="bg-[#292330] text-[#FAF6F0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-moneta-card">
        <div className="space-y-1 max-w-xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C7D8C5] uppercase block">
            Proactive Strategy
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0]">
            Ready to explore how an extra ₹500/mo SIP during dips accelerates your arrival?
          </h3>
          <p className="text-xs text-[#FAF6F0]/75 leading-relaxed font-sans">
            Test variable contributions, step-ups, and career milestone bumps in the What-If Simulator.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('whatif')}
            className="bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-6 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <span>Model in What-If Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
