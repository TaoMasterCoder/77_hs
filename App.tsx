import React, { useState, useEffect } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { Cases } from './components/Cases';
import { LandingPage } from './components/LandingPage';
import { About } from './components/About';
import { AIAssistant } from './components/AIAssistant';
import { AppointmentModal } from './components/AppointmentModal';
import { UserState, Transaction, PlanType, Currency, Appointment } from './types';
import { EXCHANGE_RATE_USD_TO_CNY } from './constants';

const App: React.FC = () => {
  // State-based routing
  const [page, setPage] = useState<PageType>('home');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // --- Global User State (Lifted from Dashboard) ---
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('qiqi_user_state');
    const defaultState: UserState = {
      balance: 0,
      displayCurrency: 'CNY',
      isSubscribed: false,
      activePlan: null,
      userCount: 0,
      storageGB: 5, // Free tier
      tokensUsed: 0,
      expiryDate: null,
      transactions: [],
      appointments: []
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration checks
        if (!parsed.transactions) parsed.transactions = [];
        if (!parsed.displayCurrency) parsed.displayCurrency = 'CNY';
        if (!parsed.appointments) parsed.appointments = [];
        return parsed;
      } catch (e) {
        console.error("Failed to load state", e);
        return defaultState;
      }
    }
    return defaultState;
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('qiqi_user_state', JSON.stringify(userState));
  }, [userState]);

  // AI Transaction Handler
  const handleAITransaction = (amount: number, description: string, type: Transaction['type']) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: amount,
      currency: 'CNY',
      exchangeRate: 1,
      baseAmount: amount,
      description: description,
      type: type,
      status: 'success'
    };

    setUserState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const handleStart = () => setPage('dashboard');

  const handleAddAppointment = (data: { name: string; company: string; phone: string; email: string }) => {
    const newAppt: Appointment = {
        id: Date.now().toString(),
        ...data,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };
    setUserState(prev => ({
        ...prev,
        appointments: [newAppt, ...prev.appointments]
    }));
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <LandingPage onStart={handleStart} onSchedule={() => setShowAppointmentModal(true)} />;
      case 'features':
        return <Features onStart={handleStart} />;
      case 'cases':
        return <Cases onStart={handleStart} onSchedule={() => setShowAppointmentModal(true)} />;
      case 'about':
        return <About />;
      case 'dashboard':
        return <Dashboard userState={userState} setUserState={setUserState} />;
      default:
        return <LandingPage onStart={handleStart} onSchedule={() => setShowAppointmentModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar currentPage={page} onNavigate={setPage} />
      
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Global Footer for marketing pages */}
      {page !== 'dashboard' && <Footer onNavigate={setPage} />}

      {/* Global AI Assistant - Visible on all pages */}
      <AIAssistant 
        userState={userState} 
        onAddTransaction={handleAITransaction} 
      />

      {/* Global Appointment Modal */}
      <AppointmentModal 
         isOpen={showAppointmentModal} 
         onClose={() => setShowAppointmentModal(false)} 
         onSubmit={handleAddAppointment}
      />
    </div>
  );
};

export default App;