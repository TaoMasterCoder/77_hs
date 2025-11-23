import React, { useState, useEffect, useRef } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [runTour, setRunTour] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Helper for mock dates
  const getMockDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
  };

  const getFutureDate = (daysForward: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysForward);
    return d.toISOString().split('T')[0];
  };

  // --- Global User State (Lifted from Dashboard) ---
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('qiqi_user_state_v2'); // Updated key to force fresh mock data

    // Mock Transactions
    const mockTransactions: Transaction[] = [
       {
         id: 'tx_3',
         type: 'resource',
         amount: -2000,
         currency: 'CNY',
         exchangeRate: 1,
         baseAmount: -2000,
         description: '购买 AI Token 额度 (10万)',
         date: getMockDate(2),
         status: 'success'
       },
       {
         id: 'tx_2',
         type: 'resource',
         amount: -6000,
         currency: 'CNY',
         exchangeRate: 1,
         baseAmount: -6000,
         description: '存储空间扩容 1TB (1年)',
         date: getMockDate(15),
         status: 'success'
       },
       {
         id: 'tx_1',
         type: 'subscription',
         amount: -108000,
         currency: 'CNY',
         exchangeRate: 1,
         baseAmount: -108000,
         description: '订阅专业版 (150人/年)',
         date: getMockDate(45),
         status: 'success'
       },
       {
         id: 'tx_0',
         type: 'recharge',
         amount: 20000,
         currency: 'USD',
         exchangeRate: 7.2,
         baseAmount: 144000,
         description: '账户余额充值 (USD)',
         date: getMockDate(46),
         status: 'success'
       }
    ];

    // Mock Appointments
    const mockAppointments: Appointment[] = [
        {
            id: 'apt_1',
            name: '李明',
            company: '华兴科技',
            phone: '13900139000',
            email: 'liming@huaxing.com',
            submittedAt: getMockDate(1),
            status: 'pending'
        },
        {
            id: 'apt_2',
            name: '王芳',
            company: '创意设计工坊',
            phone: '13812345678',
            email: 'wangfang@design.cn',
            submittedAt: getMockDate(3),
            status: 'contacted'
        },
        {
            id: 'apt_3',
            name: 'John Smith',
            company: 'Global Ventures',
            phone: '+1 415-555-0123',
            email: 'john@gventures.com',
            submittedAt: getMockDate(5),
            status: 'contacted'
        }
    ];

    const defaultState: UserState = {
      balance: 38000, // 144000 - 108000 - 6000 - 2000 + some existing
      displayCurrency: 'CNY',
      isSubscribed: true,
      activePlan: PlanType.PROFESSIONAL,
      userCount: 150,
      storageGB: 1029, // 5GB free + 1024GB purchased
      tokensUsed: 452000,
      expiryDate: getFutureDate(320),
      transactions: mockTransactions,
      appointments: mockAppointments
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
    localStorage.setItem('qiqi_user_state_v2', JSON.stringify(userState));
  }, [userState]);

  // Tour logic
  const tourSteps: Step[] = [
    {
      target: '#tour-hero',
      content: '欢迎来到企企云！这是您的下一代企业核心系统，助力企业数字化转型。',
      disableBeacon: true,
      placement: 'bottom',
    },
    {
      target: '#tour-features',
      content: '这里汇集了项目管理、移动办公、业财一体化等核心功能，全场景赋能业务。',
      placement: 'top',
    },
    {
      target: '#pricing',
      content: '灵活透明的定价体系，支持按需订阅与资源弹性扩展，成本可控。',
      placement: 'top',
    }
  ];

  useEffect(() => {
    // Only run on home page
    if (page === 'home') {
        const seen = localStorage.getItem('qiqi_tour_seen');
        if (!seen) {
            setRunTour(true);
        }
    } else {
        setRunTour(false);
    }
  }, [page]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRunTour(false);
        localStorage.setItem('qiqi_tour_seen', 'true');
    }
  };

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
    <div className={`min-h-screen font-sans flex flex-col relative transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar 
        currentPage={page} 
        onNavigate={setPage} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {page === 'home' && (
        <Joyride
          steps={tourSteps}
          run={runTour}
          continuous
          showSkipButton
          showProgress
          styles={{
            options: {
              primaryColor: '#2563eb',
              textColor: isDarkMode ? '#e2e8f0' : '#1e293b',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              arrowColor: isDarkMode ? '#1e293b' : '#ffffff',
              zIndex: 1000,
            },
            buttonNext: {
              backgroundColor: '#2563eb',
              color: '#ffffff',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.5rem 1rem',
            },
            buttonBack: {
              color: isDarkMode ? '#94a3b8' : '#64748b',
              marginRight: '0.5rem',
            },
            buttonSkip: {
              color: isDarkMode ? '#94a3b8' : '#64748b',
            },
          }}
          callback={handleJoyrideCallback}
          locale={{
            back: '上一步',
            close: '关闭',
            last: '完成',
            next: '下一步',
            skip: '跳过',
          }}
        />
      )}

      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Global Footer for marketing pages */}
      {page !== 'dashboard' && <Footer onNavigate={setPage} isDarkMode={isDarkMode} />}

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