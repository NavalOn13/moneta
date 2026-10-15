import React from 'react';
import Logo from './Logo';
import { ShieldCheck, Info, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-[#292330]/10 bg-[#FAF6F0] pt-12 pb-16 px-4 lg:px-8 text-xs text-[#292330]/75">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Upper Editorial Philosophy */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#292330]/10">
          <div className="flex items-center gap-4">
            <Logo size="md" subtitle="FINANCIAL ARCHITECTURE" />
          </div>
          <p className="font-display italic text-sm md:text-base text-[#292330]/85 max-w-md">
            “Wealth is grown in silence, not shouted in haste. Moneta is built to shield students from gambling algorithms and get-rich-quick noise.”
          </p>
        </div>

        {/* Regulatory & Educational Compliance Notice */}
        <div className="bg-[#F3EBDD] border border-[#292330]/10 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-[#8FA68C] flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-[11px] leading-relaxed text-[#292330]/80">
            <span className="font-bold text-[#292330] uppercase tracking-wider text-[10px] block mb-0.5">
              Educational Platform Notice & Statutory Disclosure
            </span>
            <p>
              Moneta is an independent financial education and strategic decision-support platform. We do not execute securities transactions, hold investor funds, solicit deposits, or act as an AMFI-registered mutual fund distributor (ARN) or SEBI-registered investment advisor. 
            </p>
            <p>
              All future projections, milestone dates, compound interest figures, and stress test scenarios are mathematical simulations based on historical 10-to-20 year rolling benchmarks of Indian capital markets (e.g., Nifty 50 TRI). Mutual fund investments are subject to market risks; read all scheme-related documents carefully.
            </p>
          </div>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[11px] text-[#292330]/60">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button onClick={() => onNavigate?.('overview')} className="hover:text-[#292330] transition-colors">Overview</button>
            <button onClick={() => onNavigate?.('learn')} className="hover:text-[#292330] transition-colors">Instrument Guide</button>
            <button onClick={() => onNavigate?.('plan')} className="hover:text-[#292330] transition-colors">Blueprint Methodology</button>
            <button onClick={() => onNavigate?.('stress')} className="hover:text-[#292330] transition-colors">Stress Resilience Lab</button>
            <button onClick={() => onNavigate?.('whatif')} className="hover:text-[#292330] transition-colors">What-If Models</button>
            <span className="cursor-pointer hover:text-[#292330] transition-colors">Privacy Architecture</span>
            <span className="cursor-pointer hover:text-[#292330] transition-colors">Student Financial Guide</span>
          </div>
          <div>
            © 2026 Moneta Financial Technologies Pvt Ltd. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
