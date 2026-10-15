import React, { useState } from 'react';
import { CheckCircle2, Award, Calendar, TrendingUp, ArrowRight, ShieldCheck, Plus, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { formatINR } from '../utils/formatters';
import confetti from 'canvas-confetti';

export default function JourneyScreen({ onNavigate, userProfile, planState, setPlanState }) {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [depositRecorded, setDepositRecorded] = useState(false);

  const currentCapital = planState.currentReserve || 42500;
  const targetCorpus = planState.targetCorpus || 1000000;
  const outOfPocket = 38000;
  const compoundLift = currentCapital - outOfPocket;
  const percentAchieved = ((currentCapital / targetCorpus) * 100).toFixed(2);

  const [depositLogs, setDepositLogs] = useState([
    { id: 1, month: 'Apr 2026', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 42500 },
    { id: 2, month: 'Mar 2026', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 40100 },
    { id: 3, month: 'Feb 2026', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 37800 },
    { id: 4, month: 'Jan 2026', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 35500 },
    { id: 5, month: 'Dec 2025', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 33200 },
    { id: 6, month: 'Nov 2025', amount: 2000, equity: 1600, liquid: 400, status: 'Allocated & Reinvested', total: 31000 },
  ]);

  const milestones = [
    { month: 'Month 1', age: 'Age 19', title: 'The First Seed', desc: 'First ₹2,000 student SIP unlocked (80% Nifty 50 Index / 20% Emergency Liquid Vault).', status: 'completed' },
    { month: 'Month 3', age: 'Age 19.3', title: 'Discipline Milestone', desc: '92/100 consistency score awarded for uninterrupted habit during exam season.', status: 'completed' },
    { month: 'Month 6', age: 'Age 19.5', title: '₹42,500 Corpus Active', desc: '+₹4,500 in pure compound interest earned with zero manual labor.', status: 'current' },
    { month: 'Month 12', age: 'Age 20', title: 'First Year Horizon', desc: 'Estimated ₹58,000 corpus with emergency foundation complete.', status: 'upcoming' },
    { month: 'Month 25', age: 'Age 21', title: 'Phase 1 Complete', desc: '₹50,000 Emergency Shield fully insulated against college contingencies.', status: 'upcoming' },
    { month: 'Month 78', age: 'Age 25.5', title: '₹10,00,000 Summit', desc: 'Financial autonomy unlocked: compound growth outpaces annual contributions.', status: 'upcoming' },
  ];

  const handleRecordDeposit = () => {
    const newCapital = currentCapital + 2000;
    setPlanState(prev => ({
      ...prev,
      currentReserve: newCapital,
    }));

    const newEntry = {
      id: Date.now(),
      month: 'May 2026',
      amount: 2000,
      equity: 1600,
      liquid: 400,
      status: 'Allocated & Reinvested',
      total: newCapital,
    };

    setDepositLogs([newEntry, ...depositLogs]);
    setDepositRecorded(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#B86F52', '#8FA68C', '#292330']
      });
    } catch(e) {}

    setTimeout(() => setDepositRecorded(false), 4000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
            <span>Wealth Architecture</span>
            <span>/</span>
            <span>Step 3 of Wealth Journey</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[#292330] tracking-tight leading-[1.1]">
            Reflecting on Quiet Compounding: Your Wealth Milestones.
          </h1>

          <p className="text-xs sm:text-sm text-[#292330]/80 leading-relaxed font-sans">
            Wealth is grown in silence, not shouted in haste. Review how your consistent <strong className="text-[#292330] tnum">₹2,000 monthly student allocation</strong> transforms into long-term financial autonomy.
          </p>
        </div>

        {/* State Toggle & Habit Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="inline-flex items-center gap-1.5 bg-[#FAF6F0] border border-[#292330]/20 hover:border-[#292330]/40 text-[#292330] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#B86F52]" />
            <span>{showEmptyState ? "View Aarav's Active Journey" : "Preview Zero-State (Empty State)"}</span>
          </button>

          <div className="bg-[#FAF6F0] border border-[#292330]/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8FA68C] shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8FA68C] animate-pulse"></span>
            <span>Active Habit Streak: 6 Months Unbroken</span>
          </div>
        </div>
      </section>

      {/* Conditional: Empty State for brand new users */}
      {showEmptyState ? (
        <section className="bg-[#FAF6F0] border-2 border-dashed border-[#292330]/20 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 animate-in fade-in">
          <div className="w-14 h-14 rounded-full bg-[#C7D8C5]/40 text-[#292330] flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7 text-[#B86F52]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
            Every ₹10 Lakh corpus starts with an initial ₹500 step.
          </h2>
          <p className="text-xs sm:text-sm text-[#292330]/75 leading-relaxed font-sans max-w-lg mx-auto">
            You don’t need large capital to embark on wealth planning. Once you set up your budget and allocate your first monthly deposit, your milestones and compounding curve will materialize here.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('plan')}
              className="bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-6 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              Seed Your Journey in Build My Plan →
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* Module 1: Core Milestone Horizon Summary Card */}
          <section className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-moneta-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#292330]/10">
              <div>
                <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider block">
                  Current Wealth Position
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-display text-4xl sm:text-5xl text-[#292330] tnum">
                    {formatINR(currentCapital)}
                  </span>
                  <span className="text-xs font-semibold text-[#8FA68C] bg-[#C7D8C5]/50 px-2.5 py-1 rounded-full">
                    {percentAchieved}% of {formatINR(targetCorpus)} Goal
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleRecordDeposit}
                  className="flex-1 sm:flex-none bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{depositRecorded ? 'Deposit Logged!' : "Record This Month's ₹2,000"}</span>
                </button>

                <button
                  onClick={() => onNavigate('plan')}
                  className="px-4 py-2.5 rounded-lg border border-[#292330]/20 hover:border-[#292330]/40 text-[#292330] text-xs font-semibold transition-colors"
                >
                  Adjust Plan →
                </button>
              </div>
            </div>

            {/* Breakdown Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-[#F3EBDD]/60 p-4 rounded-xl border border-[#292330]/10">
                <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Out-Of-Pocket Savings</span>
                <span className="text-2xl font-bold text-[#292330] tnum block mt-1">{formatINR(outOfPocket)}</span>
                <span className="text-[10px] text-[#292330]/65">Hard cash saved from pocket allowance</span>
              </div>

              <div className="bg-[#C7D8C5]/30 p-4 rounded-xl border border-[#8FA68C]/30">
                <span className="text-[10px] text-[#292330]/75 uppercase font-bold block">Pure Compound Lift</span>
                <span className="text-2xl font-bold text-[#8FA68C] tnum block mt-1">+{formatINR(compoundLift)}</span>
                <span className="text-[10px] text-[#292330]/70">Dividends + index growth without extra hours</span>
              </div>

              <div className="bg-[#F3EBDD]/60 p-4 rounded-xl border border-[#292330]/10">
                <span className="text-[10px] text-[#292330]/60 uppercase font-semibold block">Phase 1 Target</span>
                <span className="text-2xl font-bold text-[#292330] tnum block mt-1">₹50,000 Emergency Base</span>
                <span className="text-[10px] text-[#8FA68C] font-semibold">85% funded (Only ₹7,500 left)</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-[#292330]/70 font-semibold">
                <span>Phase 1: ₹50,000 Emergency Shield</span>
                <span className="text-[#8FA68C]">85% Ready</span>
              </div>
              <div className="w-full bg-[#292330]/10 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-[#8FA68C] h-full rounded-full transition-all duration-500" style={{ width: '85%' }} />
              </div>
            </div>
          </section>

          {/* Module 2: Meaningful Progress Narrative (Quarterly Callout Box) */}
          <section className="bg-[#C7D8C5]/30 border border-[#8FA68C]/40 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B86F52]" />
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
                  What changed this quarter?
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#292330]/85 leading-relaxed font-sans">
                <strong className="text-[#292330]">₹1,500 in market dividends and index growth</strong> quietly accrued to your corpus without any extra effort or trades from you. Your money is now working alongside your college studies.
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#292330]/15 text-right flex-shrink-0">
              <span className="text-[10px] font-bold text-[#292330]/60 uppercase block">Compounding Acceleration</span>
              <span className="text-lg font-bold text-[#B86F52] block mt-0.5">~1.8 Months Saved</span>
              <span className="text-[10px] text-[#292330]/70">shaved off ₹10L milestone date</span>
            </div>
          </section>

          {/* Module 3: Milestone Chronology (Timeline Cards) */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
              Milestone Chronology (Month 1 to Month 78)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestones.map((m, idx) => {
                const isCompleted = m.status === 'completed';
                const isCurrent = m.status === 'current';
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#FAF6F0] border-2 border-[#B86F52] shadow-sm'
                        : isCompleted
                        ? 'bg-[#F3EBDD]/60 border-[#292330]/15'
                        : 'bg-[#FAF6F0]/60 border-[#292330]/10 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#292330]/60 uppercase">
                        {m.month} • {m.age}
                      </span>
                      {isCompleted && (
                        <span className="text-[9px] bg-[#8FA68C] text-[#FAF6F0] px-2 py-0.5 rounded-full font-bold uppercase">
                          Achieved
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[9px] bg-[#B86F52] text-[#FAF6F0] px-2 py-0.5 rounded-full font-bold uppercase">
                          Current Standing
                        </span>
                      )}
                      {!isCompleted && !isCurrent && (
                        <span className="text-[9px] text-[#292330]/50 uppercase font-semibold">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-lg text-[#292330] font-semibold">
                      {m.title}
                    </h4>

                    <p className="text-xs text-[#292330]/75 leading-relaxed mt-1 font-sans">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Module 4: 6-Month Contribution Log & Allocation Ledger */}
          <section className="moneta-card p-6 sm:p-7 shadow-moneta-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#292330]/10 pb-3">
              <div>
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider block">
                  6-Month Contribution Log & Allocation Ledger
                </span>
                <span className="text-xs text-[#292330]/65">
                  Consistent ₹2,000/month allocation split 80/20 into Index Fund and Liquid Reserve:
                </span>
              </div>
              <span className="text-xs font-bold text-[#8FA68C]">
                100% Verified
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#292330]/10 text-[10px] font-bold text-[#292330]/60 uppercase">
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Monthly Deposit</th>
                    <th className="py-2.5">Equity Index (80%)</th>
                    <th className="py-2.5">Liquid Vault (20%)</th>
                    <th className="py-2.5">Execution Status</th>
                    <th className="py-2.5 text-right">Cumulative Portfolio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#292330]/5">
                  {depositLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F3EBDD]/40 transition-colors">
                      <td className="py-3 font-semibold text-[#292330]">{log.month}</td>
                      <td className="py-3 font-bold text-[#292330] tnum">{formatINR(log.amount)}</td>
                      <td className="py-3 text-[#292330]/80 tnum">{formatINR(log.equity)}</td>
                      <td className="py-3 text-[#292330]/80 tnum">{formatINR(log.liquid)}</td>
                      <td className="py-3">
                        <span className="bg-[#C7D8C5]/60 text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded">
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-[#292330] tnum">
                        {formatINR(log.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
