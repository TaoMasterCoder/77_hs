import React, { useState } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { Cases } from './components/Cases';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  // State-based routing
  const [page, setPage] = useState<PageType>('home');

  const handleStart = () => setPage('dashboard');

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <LandingPage onStart={handleStart} />;
      case 'features':
        return <Features onStart={handleStart} />;
      case 'cases':
        return <Cases onStart={handleStart} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar currentPage={page} onNavigate={setPage} />
      
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Only show global footer on non-dashboard pages, or always show it? 
          Usually dashboards have their own layout. 
          Here Dashboard component is full page but we can keep footer if we want.
          Based on previous design, Dashboard was exclusive. 
          Let's keep Footer for marketing pages only.
      */}
      {page !== 'dashboard' && <Footer />}
    </div>
  );
};

export default App;