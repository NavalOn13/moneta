import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Sparkles, TrendingUp, HelpCircle, Check, ShieldCheck, Zap, Bookmark } from 'lucide-react';
import { formatINR, calculateMonthsToTarget } from '../utils/formatters';
import confetti from 'canvas-confetti';

export default function WhatIfScreen({ onNavigate, userProfile, planState, setPlanState }) {
  // Baseline defaults
  const baselineMonthly = planState.monthlySip || 2000;
  const baselineStepUp = 0.10;
  const baselineCorpus = planState.targetCorpus || 1000000;
  const baselineCagr = 0.115;

  // Simulator variable controls
  const [simMonthly, setSimMonthly] = useState(2500);
  const [simStepUp, setSimStepUp] = useState(15); // in %
  const [simCorpus, setSimCorpus] = useState(1000000);
  const [simCagr, setSimCagr] = useState(12.0); // in %
  const [includeInternship, setIncludeInternship] = useState(true); // +₹15,000 stipend at age 20.5
  const [activeScenarioId, setActiveScenarioId] = useState('freelance');
  const [savedBanner, setSavedBanner] = useState(false);

  // Calculate baseline trajectory
  const baselineResult = calculateMonthsToTarget(
    baselineCorpus,
    planState.currentReserve || 42500,
    baselineMonthly,
    baselineCagr,
    baselineStepUp
  );

  // Calculate simulated trajectory with internship bonus
  const startingReserve = (planState.currentReserve || 42500) + (includeInternship ? 15000 : 0);
  const simResult = calculateMonthsToTarget(
    simCorpus,
    startingReserve,
    simMonthly,
    simCagr / 100,
    simStepUp / 100
  );

  const monthsSaved = Math.max(0, baselineResult.months - simResult.months);
  const arrivalAge = +(19 + simResult.years).toFixed(1);
  const baselineArrivalAge = +(19 + baselineResult.years).toFixed(1);

  // Quick-load presets
  const scenarioTiles = [
    {
      id: 'freelance',
      title: 'What if I add ₹500/mo from a freelance gig?',
      desc: 'Bumps monthly contribution from ₹2,000 to ₹2,500 with campus project income.',
      action: () => {
        setSimMonthly(2500);
        setSimStepUp(15);
        setSimCagr(12.0);
        setIncludeInternship(true);
        setActiveScenarioId('freelance');
      }
    },
    {
      id: 'salary',
      title: 'What if my starting salary hits ₹35,000?',
      desc: 'Enables 20% annual step-up from age 21, accelerating your ₹10L goal by ~2.5 years.',
      action: () => {
        setSimMonthly(3000);
        setSimStepUp(20);
        setSimCagr(12.0);
        setIncludeInternship(true);
        setActiveScenarioId('salary');
      }
    },
    {
      id: 'delay',
      title: 'What if I delay investing until age 21?',
      desc: 'Costs ~₹1,85,000 in missed compounding headroom that takes 4 years to recover.',
      action: () => {
        setSimMonthly(1500);
        setSimStepUp(10);
        setSimCagr(11.5);
        setIncludeInternship(false);
        setActiveScenarioId('delay');
      }
    },
    {
      id: 'cyclical',
      title: 'What if the broad market averages 10% vs 14%?',
      desc: 'Models lower return cycles to build realistic mental buffers for student pacing.',
      action: () => {
        setSimMonthly(2000);
        setSimStepUp(10);
        setSimCagr(10.0);
        setIncludeInternship(false);
        setActiveScenarioId('cyclical');
      }
    },
  ];

  const handleReset = () => {
    setSimMonthly(baselineMonthly);
    setSimStepUp(baselineStepUp * 100);
    setSimCorpus(baselineCorpus);
    setSimCagr(baselineCagr * 100);
    setIncludeInternship(false);
    setActiveScenarioId('baseline');
  };

  const handleAdoptScenario = () => {
    setPlanState(prev => ({
      ...prev,
      monthlySip: simMonthly,
      targetCorpus: simCorpus,
      estimatedYears: simResult.years,
      estimatedMonths: simResult.months,
    }));

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#B86F52', '#C7D8C5', '#292330']
      });
    } catch(e) {}

    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 4000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
            <span>Decision Lab</span>
            <span>/</span>
            <span>Signature Wealth Simulator</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[#292330] tracking-tight leading-[1.1]">
            Explore Possibilities: Your Wealth Laboratory.
          </h1>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            Financial trajectories are not cast in stone. Toggle hypothetical decisions, explore student income shifts, and discover how subtle compounding tweaks accelerate your <strong className="text-[#292330] tnum">{formatINR(simCorpus)}</strong> milestone.
          </p>
        </div>

        {/* Baseline Quick Stats Pill */}
        <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl text-right flex-shrink-0 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">Baseline Benchmark</span>
          <div className="text-xs font-bold text-[#292330] tnum">
            {formatINR(baselineMonthly)}/mo SIP • Age {baselineArrivalAge} ({baselineResult.years} yrs)
          </div>
          <span className="text-[11px] text-[#292330]/70 block">
            Nifty 50 at 11.5% historical CAGR
          </span>
        </div>
      </section>

      {/* Section 1: Interactive Question Starter Tiles */}
      <section className="space-y-3">
        <span className="text-xs font-bold text-[#292330] uppercase tracking-wider block">
          Quick-Load Student Scenarios
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarioTiles.map((tile) => {
            const isActive = activeScenarioId === tile.id;
            return (
              <button
                key={tile.id}
                onClick={tile.action}
                className={`p-4 rounded-xl text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#292330] text-[#FAF6F0] shadow-md ring-2 ring-[#B86F52]'
                    : 'bg-[#FAF6F0] border border-[#292330]/15 hover:border-[#292330]/35 text-[#292330]'
                }`}
              >
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${isActive ? 'text-[#C7D8C5]' : 'text-[#B86F52]'}`}>
                    Scenario
                  </span>
                  <h4 className="font-display text-base font-semibold leading-snug">
                    {tile.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isActive ? 'text-[#FAF6F0]/80' : 'text-[#292330]/70'}`}>
                    {tile.desc}
                  </p>
                </div>
                <div className="pt-3 flex items-center justify-between text-[11px] font-semibold">
                  <span className={isActive ? 'text-[#C7D8C5]' : 'text-[#B86F52]'}>
                    {isActive ? 'Active model' : 'Load model →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 2: Two-Column Interactive Simulation Workspace */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Variable Control Deck (5 Cols) */}
        <div className="lg:col-span-5 moneta-card p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
            <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
              Adjust Key Variables
            </span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B86F52] hover:text-[#A45F44] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset variables</span>
            </button>
          </div>

          {/* Slider 1: Monthly Student Contribution */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#292330]">Monthly Contribution:</span>
              <span className="text-base font-extrabold text-[#292330] tnum">{formatINR(simMonthly)}/mo</span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="250"
              value={simMonthly}
              onChange={(e) => { setSimMonthly(Number(e.target.value)); setActiveScenarioId('custom'); }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-[#292330]/60">
              <span>₹1,000 (Min)</span>
              <span>₹5,000</span>
              <span>₹10,000 (Career Level)</span>
            </div>
          </div>

          {/* Slider 2: Post-College Annual Step-Up */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#292330]">Post-College Annual Step-Up:</span>
              <span className="text-base font-extrabold text-[#8FA68C] tnum">+{simStepUp}% / yr</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={simStepUp}
              onChange={(e) => { setSimStepUp(Number(e.target.value)); setActiveScenarioId('custom'); }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-[#292330]/60">
              <span>0% (Flat SIP)</span>
              <span>10% (Normal)</span>
              <span>25% (High Promo)</span>
            </div>
          </div>

          {/* Slider 3: Target Corpus Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#292330]">Target Corpus Horizon:</span>
              <span className="text-base font-extrabold text-[#292330] tnum">{formatINR(simCorpus)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="2500000"
              step="100000"
              value={simCorpus}
              onChange={(e) => { setSimCorpus(Number(e.target.value)); setActiveScenarioId('custom'); }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-[#292330]/60">
              <span>₹5 Lakh</span>
              <span>₹10 Lakh</span>
              <span>₹25 Lakh</span>
            </div>
          </div>

          {/* Slider 4: Expected Market Return (CAGR) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#292330]">Expected Index Return (CAGR):</span>
              <span className="text-base font-extrabold text-[#B86F52] tnum">{simCagr.toFixed(1)}% p.a.</span>
            </div>
            <input
              type="range"
              min="8.0"
              max="15.0"
              step="0.5"
              value={simCagr}
              onChange={(e) => { setSimCagr(Number(e.target.value)); setActiveScenarioId('custom'); }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-[#292330]/60">
              <span>8.0% (Bearish)</span>
              <span>11.5% (Benchmark)</span>
              <span>15.0% (Bullish)</span>
            </div>
          </div>

          {/* Modifier: Internship Stipend injection */}
          <div className="p-3.5 rounded-xl bg-[#F3EBDD]/60 border border-[#292330]/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#292330] block">
                Include ₹15,000 Summer Internship Stipend
              </span>
              <span className="text-[11px] text-[#292330]/70">
                Modeled as one-time capital injection at age 20.5
              </span>
            </div>
            <input
              type="checkbox"
              checked={includeInternship}
              onChange={(e) => setIncludeInternship(e.target.checked)}
              className="w-4 h-4 text-[#292330] rounded border-[#292330]/20 focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Dynamic Real-time Impact Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top 4-Card Impact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            
            <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl shadow-sm space-y-1">
              <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">New Arrival Age</span>
              <span className="text-2xl font-extrabold text-[#292330] tnum block">Age {arrivalAge}</span>
              {monthsSaved > 0 && (
                <span className="inline-block bg-[#C7D8C5]/70 text-[#292330] text-[9px] font-bold px-1.5 py-0.5 rounded">
                  Saved {monthsSaved} Months!
                </span>
              )}
            </div>

            <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl shadow-sm space-y-1">
              <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Compounded Lift</span>
              <span className="text-2xl font-extrabold text-[#8FA68C] tnum block">
                +{formatINR(Math.max(0, simResult.compoundGains - baselineResult.compoundGains))}
              </span>
              <span className="text-[10px] text-[#292330]/60 block">Pure market growth</span>
            </div>

            <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl shadow-sm space-y-1">
              <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Out-Of-Pocket</span>
              <span className="text-2xl font-extrabold text-[#292330] tnum block">{formatINR(simResult.totalDeposited)}</span>
              <span className="text-[10px] text-[#292330]/60 block">
                {((simResult.totalDeposited / simResult.finalValue) * 100).toFixed(0)}% of corpus
              </span>
            </div>

            <div className="bg-[#FAF6F0] border border-[#292330]/15 p-4 rounded-xl shadow-sm space-y-1">
              <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Monthly Surplus</span>
              <span className="text-2xl font-extrabold text-[#8FA68C] tnum block">
                {formatINR(Math.max(0, (userProfile.allowance || 8000) - 5500 - simMonthly))}
              </span>
              <span className="text-[10px] text-[#292330]/60 block">Safe college buffer</span>
            </div>

          </div>

          {/* Visual Trajectory Comparison Curve */}
          <div className="moneta-card p-6 sm:p-7 shadow-moneta-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#292330]/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">
                  Comparative Trajectory Visualisation
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#292330]">
                  Baseline Plan vs. Experimental Scenario
                </h3>
              </div>
              <div className="text-xs text-[#292330]/70">
                Timeline to {formatINR(simCorpus)}
              </div>
            </div>

            {/* SVG Trajectory Chart */}
            <div className="p-4 bg-[#F3EBDD]/40 rounded-xl border border-[#292330]/10">
              <div className="flex items-center gap-6 text-xs font-semibold mb-3">
                <span className="flex items-center gap-2 text-[#292330]/60">
                  <span className="w-3 h-0.5 bg-[#292330] stroke-dashed"></span>
                  <span>Baseline Plan (Age {baselineArrivalAge} • {baselineResult.years} yrs)</span>
                </span>
                <span className="flex items-center gap-2 text-[#B86F52]">
                  <span className="w-3 h-1 bg-[#B86F52] rounded"></span>
                  <span>Experimental Scenario (Age {arrivalAge} • {simResult.years} yrs)</span>
                </span>
              </div>

              <svg className="w-full h-44 sm:h-52 overflow-visible" viewBox="0 0 500 160">
                {/* Horizontal target line */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(184, 111, 82, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <text x="5" y="24" fontSize="10" fill="#B86F52" fontWeight="700">Target: {formatINR(simCorpus)}</text>

                {/* Base axis */}
                <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(41, 35, 48, 0.2)" strokeWidth="1" />

                {/* Baseline curve (dashed) */}
                <path d="M 0 150 Q 250 115 480 30" fill="none" stroke="#292330" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="480" cy="30" r="4" fill="#292330" />
                <text x="420" y="48" fontSize="10" fill="#292330" fontWeight="600">Age {baselineArrivalAge}</text>

                {/* Simulated Curve (Solid copper, reaches target earlier) */}
                <path d="M 0 150 Q 200 100 380 30" fill="none" stroke="#B86F52" strokeWidth="3" />
                <circle cx="380" cy="30" r="5" fill="#B86F52" />
                <text x="330" y="20" fontSize="11" fill="#B86F52" fontWeight="700">Age {arrivalAge} (-{monthsSaved} mo)</text>
              </svg>

              <div className="flex items-center justify-between text-[11px] text-[#292330]/65 pt-2 border-t border-[#292330]/10">
                <span>Start: Age 19 (College Year 2)</span>
                <span>Internship (Age 20.5)</span>
                <span>Campus Placement (Age 21.5)</span>
                <span>Corpus Achieved!</span>
              </div>
            </div>

            {/* Student Trade-off Synthesis */}
            <div className="bg-[#C7D8C5]/30 border border-[#8FA68C]/30 p-4 rounded-xl text-xs space-y-1">
              <strong className="text-[#292330] block">The Student Trade-Off Synthesis:</strong>
              <p className="text-[#292330]/80 leading-relaxed">
                By allocating just <span className="font-bold text-[#292330]">+{formatINR(Math.max(0, simMonthly - baselineMonthly))} extra</span> from your campus projects and committing to a <span className="font-bold text-[#292330]">{simStepUp}% post-grad step-up</span>, you reach your target <strong className="text-[#B86F52]">{monthsSaved} months faster</strong>. No extreme student austerity required.
              </p>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleAdoptScenario}
              className="bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-6 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>{savedBanner ? 'Scenario Adopted!' : 'Adopt This Scenario into My Plan →'}</span>
            </button>

            <button
              onClick={() => onNavigate('stress')}
              className="bg-[#FAF6F0] border border-[#292330]/20 hover:border-[#292330]/40 text-[#292330] px-4 py-3 rounded-lg text-xs font-semibold transition-colors"
            >
              Test in Stress Test
            </button>
          </div>

        </div>

      </section>

    </div>
  );
}
