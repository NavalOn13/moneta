import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OverviewScreen from './screens/OverviewScreen';
import LearnScreen from './screens/LearnScreen';
import PlanScreen from './screens/PlanScreen';
import StressTestScreen from './screens/StressTestScreen';
import WhatIfScreen from './screens/WhatIfScreen';
import JourneyScreen from './screens/JourneyScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  // Shared application state for Aarav
  const [userProfile, setUserProfile] = useState({
    name: 'Aarav Sharma',
    status: 'B.Tech CS (2nd Year) • Age 19',
    allowance: 8000,
    planTier: 'Starter Plan • ₹8k Inflow',
    monthlySip: 2000,
    disciplineScore: 92,
  });

  const [planState, setPlanState] = useState({
    monthlySip: 2000,
    allocationRatio: 80, // 80% Equity Index, 20% Liquid Emergency Vault
    targetCorpus: 1000000,
    currentReserve: 42500,
    estimatedYears: 6.5,
    estimatedMonths: 78,
  });

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EBDD] text-[#292330] font-sans antialiased">
      {/* Top Navigation Bar with live state */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        goalTarget={planState.targetCorpus}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <OverviewScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
            planState={planState}
          />
        )}

        {activeTab === 'learn' && (
          <LearnScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'plan' && (
          <PlanScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
            planState={planState}
            setPlanState={setPlanState}
          />
        )}

        {activeTab === 'journey' && (
          <JourneyScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
            planState={planState}
            setPlanState={setPlanState}
          />
        )}

        {activeTab === 'stress' && (
          <StressTestScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
            planState={planState}
          />
        )}

        {activeTab === 'whatif' && (
          <WhatIfScreen
            onNavigate={setActiveTab}
            userProfile={userProfile}
            planState={planState}
            setPlanState={setPlanState}
          />
        )}
      </main>

      {/* Global Footer with Regulatory Compliance */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
