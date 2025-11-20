import React from 'react';
import { Menu, X, Cloud } from 'lucide-react';
import { Button } from './Button';

export type PageType = 'home' | 'features' | 'cases' | 'dashboard';

interface NavbarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getLinkClass = (page: PageType) => {
    const base = "text-sm font-medium transition-colors";
    return currentPage === page 
      ? "text-blue-600 font-semibold" 
      : "text-slate-600 hover:text-blue-600";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Cloud size={24} fill="currentColor" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900 tracking-tight">
              企企云服务<span className="text-blue-600">ERP</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className={getLinkClass('home')}>首页</button>
            <button onClick={() => onNavigate('features')} className={getLinkClass('features')}>产品特性</button>
            <button onClick={() => onNavigate('cases')} className={getLinkClass('cases')}>客户案例</button>
            <a href="#pricing" onClick={(e) => {
               if(currentPage !== 'home') { 
                  e.preventDefault(); 
                  onNavigate('home'); 
                  setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}), 100);
               }
            }} className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors">价格方案</a>
            
            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            
            {currentPage === 'dashboard' ? (
               <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 font-medium">欢迎回来, 管理员</span>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('home')}>退出控制台</Button>
               </div>
            ) : (
              <div className="flex items-center gap-3">
                 <button onClick={() => onNavigate('dashboard')} className="text-slate-900 font-medium text-sm hover:text-blue-600">登录</button>
                 <Button onClick={() => onNavigate('dashboard')} size="sm">免费试用 / 控制台</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 p-2">
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
            <div className="pt-4 mt-2 border-t border-slate-100">
               <Button className="w-full mb-2" onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}>进入控制台</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};