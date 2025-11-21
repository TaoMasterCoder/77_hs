import React, { useState, useEffect } from 'react';
import { Menu, X, Cloud } from 'lucide-react';
import { Button } from './Button';

export type PageType = 'home' | 'features' | 'cases' | 'dashboard' | 'about';

interface NavbarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  const isTransparent = isHome && !scrolled;

  // Determine text colors based on page and scroll state
  // On Home: Transparent bg with White text initially, then White bg with Black text on scroll
  // Other pages: Always White bg with Black text
  const navBgClass = isTransparent 
    ? 'bg-transparent border-transparent' 
    : 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm';
    
  const textColorClass = isTransparent 
    ? 'text-white/90 hover:text-white' 
    : 'text-slate-600 hover:text-blue-600';
    
  const activeColorClass = isTransparent
    ? 'text-white font-bold'
    : 'text-blue-600 font-bold';

  const logoColorClass = isTransparent ? 'text-white' : 'text-slate-900';
  
  // Button Styling Logic:
  const buttonVariant = isTransparent ? 'glass' : 'primary';

  const getLinkClass = (page: PageType) => {
    const base = "text-sm font-medium transition-colors";
    return currentPage === page ? activeColorClass : textColorClass;
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-colors ${isTransparent ? 'bg-white/10 text-white backdrop-blur-sm' : 'bg-blue-600 text-white'}`}>
              <Cloud size={24} fill="currentColor" />
            </div>
            <span className={`ml-3 text-xl font-bold tracking-tight transition-colors ${logoColorClass}`}>
              企企服务业<span className={isTransparent ? 'text-blue-300' : 'text-blue-600'}>ERP</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className={getLinkClass('home')}>首页</button>
            <button onClick={() => onNavigate('features')} className={getLinkClass('features')}>产品特性</button>
            <button onClick={() => onNavigate('cases')} className={getLinkClass('cases')}>客户案例</button>
            <button onClick={() => onNavigate('about')} className={getLinkClass('about')}>关于我们</button>
            <a href="#pricing" onClick={(e) => {
               if(currentPage !== 'home') { 
                  e.preventDefault(); 
                  onNavigate('home'); 
                  setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}), 100);
               }
            }} className={`${textColorClass} text-sm font-medium transition-colors`}>价格方案</a>
            
            <div className={`h-6 w-px mx-2 ${isTransparent ? 'bg-white/20' : 'bg-slate-300'}`}></div>
            
            {currentPage === 'dashboard' ? (
               <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${isTransparent ? 'text-white/80' : 'text-slate-500'}`}>欢迎回来, 管理员</span>
                  <Button variant={isTransparent ? 'glass' : 'outline'} size="sm" onClick={() => onNavigate('home')}>退出控制台</Button>
               </div>
            ) : (
              <div className="flex items-center gap-3">
                 <button onClick={() => onNavigate('dashboard')} className={`font-medium text-sm ${textColorClass}`}>登录</button>
                 <Button 
                    onClick={() => onNavigate('dashboard')} 
                    size="sm" 
                    variant={buttonVariant}
                  >
                    免费试用 / 控制台
                 </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${textColorClass}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md">首页</button>
            <button onClick={() => { onNavigate('features'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md">产品特性</button>
            <button onClick={() => { onNavigate('cases'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md">客户案例</button>
            <button onClick={() => { onNavigate('about'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md">关于我们</button>
            <div className="pt-4 mt-2 border-t border-slate-100">
               <Button className="w-full mb-2 bg-blue-600 text-white" onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}>进入控制台</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};