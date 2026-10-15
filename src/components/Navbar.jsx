import React, { useState } from 'react';
import Logo from './Logo';
import { Bell, User, CheckCircle2, ChevronDown, Sparkles, BookOpen } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function Navbar({ activeTab, setActiveTab, userProfile, goalTarget = 1000000 }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'learn', label: 'Learn & Explore' },
    { id: 'plan', label: 'Build My Plan' },
    { id: 'journey', label: 'My Journey' },
    { id: 'stress', label: 'Stress Test' },
    { id: 'whatif', label: 'What-If Simulator' },
  ];

  const notifications = [
    { id: 1, title: 'Discipline Milestone', text: '92/100 Discipline score maintained for 3 consecutive months.', time: '2h ago' },
    { id: 2, title: 'Quarterly Rebalance Check', text: 'Liquid vault is at 85% of ₹50,000 emergency shield.', time: '1d ago' },
    { id: 3, title: 'Today’s Insight', text: 'Demystifying Expense Ratios (TER) in passive index funds.', time: '2d ago' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F3EBDD]/90 backdrop-blur-md border-b border-[#292330]/10 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo size="md" subtitle="WEALTH JOURNEY" onClick={() => setActiveTab('overview')} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#292330] text-[#FAF6F0] shadow-sm'
                    : 'text-[#292330]/75 hover:text-[#292330] hover:bg-[#292330]/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#B86F52] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status Badges & Profile */}
        <div className="flex items-center gap-3">
          {/* Target Corpus Badge */}
          <div 
            onClick={() => setActiveTab('plan')}
            className="cursor-pointer hidden sm:flex items-center gap-2 bg-[#FAF6F0] border border-[#292330]/15 px-3 py-1.5 rounded-full text-xs font-semibold text-[#292330] hover:border-[#292330]/35 transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#8FA68C] animate-pulse"></span>
            <span className="text-[#292330]/60 uppercase tracking-wider text-[10px]">GOAL:</span>
            <span className="tnum font-bold text-[#292330]">{formatINR(goalTarget)}</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-[#292330]/70 hover:text-[#292330] hover:bg-[#292330]/5 transition-colors border border-transparent hover:border-[#292330]/10"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B86F52] rounded-full ring-2 ring-[#F3EBDD]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#FAF6F0] border border-[#292330]/15 rounded-xl shadow-moneta-modal p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#292330]/10 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#292330]">Notifications</span>
                  <span className="text-[10px] text-[#B86F52] font-semibold cursor-pointer" onClick={() => setShowNotifications(false)}>Dismiss all</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-[#F3EBDD]/60 hover:bg-[#C7D8C5]/30 transition-colors text-left cursor-pointer">
                      <div className="text-xs font-semibold text-[#292330]">{n.title}</div>
                      <div className="text-[11px] text-[#292330]/70 leading-snug mt-0.5">{n.text}</div>
                      <div className="text-[9px] text-[#292330]/50 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileModal(!showProfileModal)}
              className="flex items-center gap-2.5 bg-[#FAF6F0] border border-[#292330]/15 hover:border-[#292330]/35 px-2.5 py-1.5 rounded-full text-left transition-all shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[#292330] text-[#FAF6F0] flex items-center justify-center text-[11px] font-bold">
                A
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-bold text-[#292330] leading-none">{userProfile.name}</span>
                <span className="text-[10px] text-[#292330]/60 leading-none mt-0.5">{userProfile.planTier}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#292330]/50 hidden lg:block" />
            </button>

            {showProfileModal && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FAF6F0] border border-[#292330]/15 rounded-xl shadow-moneta-modal p-4 z-50 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-[#292330]/10">
                  <div className="w-10 h-10 rounded-full bg-[#292330] text-[#FAF6F0] flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#292330]">{userProfile.name}</h4>
                    <p className="text-xs text-[#292330]/65">{userProfile.status}</p>
                  </div>
                </div>
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#292330]/5">
                    <span className="text-[#292330]/60">Monthly Allowance:</span>
                    <span className="font-semibold text-[#292330] tnum">{formatINR(userProfile.allowance)}/mo</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#292330]/5">
                    <span className="text-[#292330]/60">Monthly Allocation:</span>
                    <span className="font-semibold text-[#292330] tnum">{formatINR(userProfile.monthlySip)}/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#292330]/60">Discipline Score:</span>
                    <span className="font-bold text-[#8FA68C]">{userProfile.disciplineScore}/100</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveTab('plan'); setShowProfileModal(false); }}
                  className="w-full mt-2 bg-[#292330] text-[#FAF6F0] py-1.5 rounded-lg text-xs font-semibold hover:bg-[#3D3446] transition-colors"
                >
                  Edit Profile & Budget
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2 pt-3 no-scrollbar border-t border-[#292330]/5 mt-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full transition-all ${
              activeTab === item.id
                ? 'bg-[#292330] text-[#FAF6F0]'
                : 'text-[#292330]/75 bg-[#FAF6F0]/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
