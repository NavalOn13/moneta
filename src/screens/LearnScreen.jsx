import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Scale, TrendingUp, AlertTriangle, Clock, HelpCircle, Check, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function LearnScreen({ onNavigate, userProfile }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [compareLeft, setCompareLeft] = useState('fd');
  const [compareRight, setCompareRight] = useState('index');

  const filters = [
    { id: 'all', label: 'All Instruments' },
    { id: 'liquid', label: 'Low Risk (Liquid)' },
    { id: 'growth', label: 'Inflation-Beating Long-Term' },
    { id: 'gold', label: 'Gold & Sovereign' },
    { id: 'tax', label: 'Tax Advantages' },
  ];

  const instruments = [
    {
      id: 'fd',
      category: 'Capital Protection',
      categoryType: 'liquid',
      title: 'Fixed Deposits & High-Yield Savings',
      subtitle: 'Safe parking for emergency cash and near-term student expenses. Nominal return: 6.0% to 7.2% per year.',
      riskLevel: 'Negligible (DICGC Insured up to ₹5 Lakh)',
      liquidity: 'Instant (Auto-sweep or 1-day FD break)',
      horizon: '1 to 12 months',
      taxImplication: 'Taxed at student slab rate',
      realReturn: '0.0% to +1.0% above 6% inflation',
      roleForStudent: 'Your ₹50,000 Emergency Shield. Never invest money you need for college fees in equity.',
      colorBadge: 'bg-[#C7D8C5]/60 text-[#292330]',
    },
    {
      id: 'sgb',
      category: 'Inflation Hedge',
      categoryType: 'gold',
      title: 'Sovereign Gold (SGBs) & Physical Gold',
      subtitle: 'Ancient store of value against currency debasement and geopolitical shocks. Historical growth: 9% to 10% p.a.',
      riskLevel: 'Moderate volatility; gold price cycles',
      liquidity: 'Medium (Secondary market or 5-8 year lock)',
      horizon: '5 to 8 years',
      taxImplication: 'Tax-free capital gains if held to full maturity',
      realReturn: '+2.5% to +3.5% above inflation',
      roleForStudent: 'Optional 5-10% diversifier later. Not ideal for active monthly ₹2,000 compounding.',
      colorBadge: 'bg-[#FAF6F0] border border-[#292330]/20 text-[#292330]',
    },
    {
      id: 'index',
      category: 'Wealth Engine (Recommended)',
      categoryType: 'growth',
      title: 'Nifty 50 Index Mutual Funds & Passive ETFs',
      subtitle: 'Automated ownership of India’s 50 largest blue-chip leaders (TCS, Reliance, HDFC, Infosys). Long-term CAGR: ~12.0%.',
      riskLevel: 'Moderate to High in short term; Low risk over 10+ years',
      liquidity: 'High (T+2 days redemption; no lock-in)',
      horizon: '5 to 7+ years (Essential for ₹10L goal)',
      taxImplication: 'LTCG at 12.5% above ₹1.25 Lakh annual profit',
      realReturn: '+5.5% to +6.5% real compounding above inflation',
      roleForStudent: 'Core wealth vehicle (80% of SIP). Outlasts inflation and captures Indian demographic expansion.',
      colorBadge: 'bg-[#B86F52] text-[#FAF6F0]',
    },
    {
      id: 'flexicap',
      category: 'Active Growth',
      categoryType: 'growth',
      title: 'Flexi-Cap & Multi-Cap Mutual Funds',
      subtitle: 'Professional fund managers allocating across large, mid, and small-cap stocks seeking alpha.',
      riskLevel: 'High; sensitive to mid-cap sentiment swings',
      liquidity: 'High (T+2 redemption; 1% exit load before 1 yr)',
      horizon: '7+ years',
      taxImplication: 'Standard equity capital gains rates',
      realReturn: '+5.0% to +7.0% dependent on manager skill',
      roleForStudent: 'Add only after mastering index funds. Higher expense ratio (1.0% to 1.8% vs 0.1% index).',
      colorBadge: 'bg-[#C7D8C5]/60 text-[#292330]',
    },
    {
      id: 'bonds',
      category: 'Sovereign Debt',
      categoryType: 'liquid',
      title: 'Government Bonds & Liquid Debt Funds',
      subtitle: 'Lending capital directly to the Government of India or AAA corporates. Predictable yield around 7.0%.',
      riskLevel: 'Low credit risk; small interest rate risk',
      liquidity: 'T+1 settlement (Very high liquidity)',
      horizon: '3 months to 3 years',
      taxImplication: 'Added to normal income tax slab',
      realReturn: '+0.5% to +1.2% real return',
      roleForStudent: 'Alternative parking space for semester fee cash before the payment due date.',
      colorBadge: 'bg-[#FAF6F0] border border-[#292330]/20 text-[#292330]',
    },
  ];

  const filteredInstruments = activeFilter === 'all' 
    ? instruments 
    : instruments.filter(i => i.categoryType === activeFilter);

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <section className="space-y-3 pt-4 max-w-3xl">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#292330]/65 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#B86F52]" />
          <span>Financial Concepts Dossier</span>
          <span>/</span>
          <span>Step 1 of Knowledge Foundation</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#292330] tracking-tight leading-[1.1]">
          Demystifying where <span className="italic font-normal">money</span> grows.
        </h1>

        <p className="text-sm sm:text-base text-[#292330]/80 leading-relaxed font-sans">
          No jargon, no get-rich-quick noise. Clear, honest comparison of where young Indian’s seed capital can safely grow and what risks lurk for the uninitiated.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-[#292330] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#FAF6F0] border border-[#292330]/15 text-[#292330]/75 hover:border-[#292330]/35'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Head-to-Head Comparison Card: Fixed Deposit vs Broad Market Index Fund */}
      <section className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-moneta-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#292330]/10">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#292330]/60 uppercase block">
              1-on-1 Instrument Contrast
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
              Fixed Deposit vs Broad Market Index Fund
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8FA68C] bg-[#C7D8C5]/40 px-3 py-1.5 rounded-full">
            <Scale className="w-3.5 h-3.5" />
            <span>Calibrated for Aarav’s ₹2,000/mo SIP</span>
          </div>
        </div>

        {/* 2-Card Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Left: Fixed Deposit / Liquid Fund */}
          <div className="bg-[#F3EBDD]/60 border border-[#292330]/15 rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
                  Traditional Fixed Deposit
                </span>
                <span className="bg-[#FAF6F0] text-[#292330] text-[10px] font-bold px-2 py-0.5 rounded border border-[#292330]/15">
                  Guaranteed Principal
                </span>
              </div>
              <h3 className="font-display text-2xl text-[#292330] mt-1">
                Bank / Post Office FD
              </h3>
              <p className="text-xs text-[#292330]/75 leading-relaxed mt-2">
                Lending your surplus capital directly to an institution in exchange for a fixed, contractual interest payment.
              </p>
            </div>

            <div className="space-y-2.5 text-xs border-t border-b border-[#292330]/10 py-3.5">
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Expected Return:</span>
                <span className="font-bold text-[#292330]">6.5% p.a. (Fixed, locked in)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Volatility & Drawdowns:</span>
                <span className="font-bold text-[#8FA68C]">0% Drawdown (Never drops in value)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Inflation Resistance:</span>
                <span className="font-bold text-[#B86F52]">Low (Barely matches 6% CPI inflation)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Liquidity & Access:</span>
                <span className="font-bold text-[#292330]">Instant (1-day notice, small penalty)</span>
              </div>
            </div>

            <div className="bg-[#FAF6F0] p-3 rounded-lg text-[11px] text-[#292330]/80">
              <strong className="text-[#292330] block mb-0.5">The Student Role:</strong>
              Perfect for your <span className="font-bold">₹50,000 Emergency Shield</span>. Never risk college fees in the market.
            </div>
          </div>

          {/* Right: Nifty 50 Index Fund */}
          <div className="bg-[#FAF6F0] border-2 border-[#292330] rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#292330] uppercase tracking-wider">
                  Passive Broad Market
                </span>
                <span className="bg-[#B86F52] text-[#FAF6F0] text-[10px] font-bold px-2 py-0.5 rounded">
                  Historically Superior Growth
                </span>
              </div>
              <h3 className="font-display text-2xl text-[#292330] mt-1">
                Nifty 50 Index Mutual Fund
              </h3>
              <p className="text-xs text-[#292330]/75 leading-relaxed mt-2">
                Owning proportionate fractional shares of India’s top 50 growing conglomerates (TCS, Reliance, HDFC, L&T, Tata).
              </p>
            </div>

            <div className="space-y-2.5 text-xs border-t border-b border-[#292330]/10 py-3.5">
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Historical Long-Term CAGR:</span>
                <span className="font-bold text-[#292330]">~12.0% p.a. (10-year rolling average)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Volatility & Drawdowns:</span>
                <span className="font-bold text-[#B86F52]">Can dip 10-25% in bear markets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Inflation Resistance:</span>
                <span className="font-bold text-[#8FA68C]">High (+5.5% to +6% above inflation)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292330]/65">Low Expense Ratio (TER):</span>
                <span className="font-bold text-[#292330]">0.10% to 0.20% (Ultra cheap)</span>
              </div>
            </div>

            <div className="bg-[#C7D8C5]/30 p-3 rounded-lg text-[11px] text-[#292330]/80 border border-[#8FA68C]/30">
              <strong className="text-[#292330] block mb-0.5">The Student Role:</strong>
              Your primary vehicle for reaching <span className="font-bold">₹10,00,000</span>. Outlasts inflation through patient compounding.
            </div>
          </div>

        </div>
      </section>

      {/* The 10-Year Divergence: ₹2,000/mo SIP Math */}
      <section className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-8 shadow-moneta-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#292330]/60 uppercase block">
              Long-Term Compounding Proof
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
              The 10-Year Divergence: ₹2,000/mo SIP
            </h2>
          </div>
          <p className="text-xs text-[#292330]/75 max-w-sm">
            What happens if Aarav allocates ₹2,000/mo into a 6.5% Fixed Deposit vs a 12.0% Nifty 50 Index Fund over 10 continuous years?
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F3EBDD]/60 p-4 rounded-xl border border-[#292330]/10">
            <span className="text-[11px] text-[#292330]/65 uppercase font-semibold block">Total Deposits (Hard Cash)</span>
            <span className="text-2xl font-bold text-[#292330] tnum mt-1 block">₹2,40,000</span>
            <span className="text-[11px] text-[#292330]/60">₹2,000 × 120 months</span>
          </div>

          <div className="bg-[#F3EBDD]/60 p-4 rounded-xl border border-[#292330]/10">
            <span className="text-[11px] text-[#292330]/65 uppercase font-semibold block">Fixed Deposit Value (6.5%)</span>
            <span className="text-2xl font-bold text-[#292330] tnum mt-1 block">₹3,41,840</span>
            <span className="text-[11px] text-[#292330]/60">+₹1,01,840 interest earned</span>
          </div>

          <div className="bg-[#C7D8C5]/40 p-4 rounded-xl border border-[#8FA68C]/40">
            <span className="text-[11px] text-[#292330]/75 uppercase font-bold block">Nifty 50 Index Value (12.0%)</span>
            <span className="text-2xl font-bold text-[#8FA68C] tnum mt-1 block">₹4,64,670</span>
            <span className="text-[11px] font-semibold text-[#B86F52]">+₹2,24,670 extra compounding advantage</span>
          </div>
        </div>

        {/* SVG Compounding Divergence Chart */}
        <div className="p-4 sm:p-6 bg-[#F3EBDD]/40 rounded-xl border border-[#292330]/10">
          <div className="flex items-center justify-between text-xs mb-3 font-semibold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#292330]">
                <span className="w-3 h-0.5 bg-[#292330]"></span>
                <span>Fixed Deposit (6.5%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#B86F52]">
                <span className="w-3 h-1 bg-[#B86F52]"></span>
                <span>Nifty 50 Index Fund (12.0%)</span>
              </span>
            </div>
            <span className="text-[11px] text-[#292330]/60">10-Year Horizon</span>
          </div>

          <svg className="w-full h-40 sm:h-48 overflow-visible" viewBox="0 0 500 150">
            {/* Gridlines */}
            <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(41, 35, 48, 0.15)" strokeWidth="1" />
            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(41, 35, 48, 0.08)" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(41, 35, 48, 0.08)" strokeDasharray="3 3" />

            {/* Base Out of Pocket line */}
            <path d="M 0 140 L 500 85" fill="none" stroke="rgba(41, 35, 48, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* FD Line (6.5%) */}
            <path d="M 0 140 Q 250 105 500 60" fill="none" stroke="#292330" strokeWidth="2" />

            {/* Index Fund Curve (12%) - Exponential hockey stick */}
            <path d="M 0 140 Q 250 95 500 20" fill="none" stroke="#B86F52" strokeWidth="3" />

            {/* Markers */}
            <circle cx="500" cy="60" r="4" fill="#292330" />
            <circle cx="500" cy="20" r="5" fill="#B86F52" />
            <text x="440" y="55" fontSize="10" fill="#292330" fontWeight="600">₹3.41 L</text>
            <text x="440" y="15" fontSize="11" fill="#B86F52" fontWeight="700">₹4.65 L</text>
          </svg>

          <p className="text-[11px] text-[#292330]/70 text-center mt-2 italic font-serif">
            Notice how the Index Fund line curves upward exponentially after Year 4 — this is the compound interest inflection point.
          </p>
        </div>
      </section>

      {/* The 5 Canonical Wealth Instruments in India Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
          The 5 Canonical Wealth Instruments in India
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInstruments.map((item) => {
            const isExpanded = expandedCard === item.id;
            return (
              <div 
                key={item.id}
                className="moneta-card p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#292330]/60 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.colorBadge}`}>
                      {item.horizon}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-[#292330] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#292330]/75 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Collapsible Key Metrics */}
                <div className="space-y-2 text-xs border-t border-[#292330]/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#292330]/60">Risk Profile:</span>
                    <span className="font-semibold text-[#292330] text-right max-w-[160px] truncate">{item.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#292330]/60">Liquidity:</span>
                    <span className="font-semibold text-[#292330]">{item.liquidity}</span>
                  </div>

                  {isExpanded && (
                    <div className="space-y-2 pt-2 border-t border-[#292330]/10 text-xs animate-in fade-in">
                      <div className="flex justify-between">
                        <span className="text-[#292330]/60">Taxation:</span>
                        <span className="font-medium text-[#292330] text-right">{item.taxImplication}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#292330]/60">Real Inflation Beat:</span>
                        <span className="font-bold text-[#8FA68C]">{item.realReturn}</span>
                      </div>
                      <div className="bg-[#F3EBDD] p-2.5 rounded text-[11px] text-[#292330]/85 mt-2">
                        <strong>Aarav's Takeaway:</strong> {item.roleForStudent}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : item.id)}
                    className="w-full text-center text-[11px] font-bold text-[#B86F52] hover:text-[#A45F44] pt-2 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide details' : 'View full trade-offs'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Jargon Buster (3 Cards) */}
      <section className="bg-[#FAF6F0] border border-[#292330]/15 rounded-2xl p-6 sm:p-8 shadow-moneta-card space-y-4">
        <h2 className="font-display text-2xl sm:text-3xl text-[#292330]">
          The Jargon Buster
        </h2>
        <p className="text-xs text-[#292330]/70 max-w-xl">
          Three terms banks and trading apps use to confuse beginners, translated into plain English.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-xl bg-[#F3EBDD]/50 border border-[#292330]/10 space-y-2">
            <span className="text-[10px] font-bold text-[#B86F52] uppercase tracking-wider block">Term 01</span>
            <h4 className="font-display text-lg text-[#292330]">CAGR (Compound Annual Growth Rate)</h4>
            <p className="text-xs text-[#292330]/75 leading-relaxed">
              The smoothed annual growth rate of your money. If an investment went from ₹100 to ₹200 over 6 years with wild zig-zags in between, CAGR tells you the average yearly speed it was travelling at (~12%).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F3EBDD]/50 border border-[#292330]/10 space-y-2">
            <span className="text-[10px] font-bold text-[#B86F52] uppercase tracking-wider block">Term 02</span>
            <h4 className="font-display text-lg text-[#292330]">Expense Ratio (TER)</h4>
            <p className="text-xs text-[#292330]/75 leading-relaxed">
              The annual fee the fund manager cuts from your money. Index funds charge 0.1% to 0.2%, while active funds charge 1.5% to 2.2%. Over 20 years, a 1.5% difference can eat up to 25% of your final wealth!
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F3EBDD]/50 border border-[#292330]/10 space-y-2">
            <span className="text-[10px] font-bold text-[#B86F52] uppercase tracking-wider block">Term 03</span>
            <h4 className="font-display text-lg text-[#292330]">Volatility vs Permanent Loss</h4>
            <p className="text-xs text-[#292330]/75 leading-relaxed">
              Volatility is the price fluctuating on your screen like a pendulum. Permanent loss only happens if the company goes bankrupt or if you panic-sell at the bottom. Quality index funds fluctuate, but don't vanish.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Transition Banner */}
      <section className="bg-[#292330] text-[#FAF6F0] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-moneta-card">
        <div className="space-y-1 max-w-xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C7D8C5] uppercase block">
            Actionable Next Step
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0]">
            Ready to see how an Index Fund or FD fits your ₹8,000 allowance?
          </h3>
          <p className="text-xs text-[#FAF6F0]/75 leading-relaxed font-sans">
            Move from theory into personalized action in Build My Plan.
          </p>
        </div>

        <button
          onClick={() => onNavigate('plan')}
          className="bg-[#B86F52] hover:bg-[#A45F44] text-[#FAF6F0] px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 flex-shrink-0"
        >
          <span>Proceed to Build My Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
