import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Database, 
  Zap, 
  LayoutDashboard, 
  Wallet, 
  History, 
  Plus,
  AlertCircle,
  AlertTriangle,
  X,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Users,
  Calendar,
  Globe
} from 'lucide-react';
import { UserState, PlanType, Transaction, Currency } from '../types';
import { RESOURCE_PRICING, EXCHANGE_RATE_USD_TO_CNY } from '../constants';
import { PricingCalculator } from './PricingCalculator';
import { Button } from './Button';
import { HelpCenter } from './HelpCenter';

export const Dashboard: React.FC = () => {
  // Simulated User State
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
      transactions: []
    };

    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration checks
      if (!parsed.transactions) parsed.transactions = [];
      if (!parsed.displayCurrency) parsed.displayCurrency = 'CNY';
      return parsed;
    }
    return defaultState;
  });

  const [view, setView] = useState<'overview' | 'subscribe' | 'resources' | 'history' | 'help'>('overview');
  const [rechargeAmount, setRechargeAmount] = useState<number | ''>('');
  const [rechargeCurrency, setRechargeCurrency] = useState<Currency>('CNY');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);
  
  // Persist state
  useEffect(() => {
    localStorage.setItem('qiqi_user_state', JSON.stringify(userState));
  }, [userState]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000); // Extended slightly for readability
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Check for subscription expiry
  useEffect(() => {
    if (userState.isSubscribed && userState.expiryDate) {
      const expiry = new Date(userState.expiryDate);
      const now = new Date();
      // Reset time part for accurate day calculation
      expiry.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);

      const diffTime = expiry.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Only show notification if it hasn't been shown in this session (in a real app, use session storage or dismissed state)
      // For this demo, we show it on mount/update if conditions are met.
      if (diffDays > 0) {
        if (diffDays <= 7) {
          setToast({
            message: `您的订阅即将到期（剩余 ${diffDays} 天），请尽快续费以免服务中断。`,
            type: 'error'
          });
        } else if (diffDays <= 30) {
           setToast({
            message: `温馨提示：您的订阅将在 ${diffDays} 天后到期，请留意续费时间。`,
            type: 'warning'
          });
        }
      } else if (diffDays <= 0) {
         setToast({
            message: `您的订阅已过期，请立即续费以恢复服务。`,
            type: 'error'
          });
      }
    }
  }, [userState.isSubscribed, userState.expiryDate]);

  // Helper to format money for display
  const formatMoney = (amountCNY: number, currency: Currency = userState.displayCurrency) => {
    if (currency === 'CNY') {
      return `¥${amountCNY.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      const amountUSD = amountCNY / EXCHANGE_RATE_USD_TO_CNY;
      return `$${amountUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
  };

  const addTransaction = (
    amount: number, 
    description: string, 
    type: Transaction['type'], 
    currency: Currency = 'CNY',
    exchangeRate: number = 1
  ) => {
    const baseAmount = currency === 'CNY' ? amount : amount * exchangeRate;
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: amount,
      currency: currency,
      exchangeRate: exchangeRate,
      baseAmount: baseAmount,
      description: description,
      type: type,
      status: 'success'
    };
    
    return newTransaction;
  };

  const handleRecharge = () => {
    const amount = typeof rechargeAmount === 'number' ? rechargeAmount : 0;
    if (amount <= 0) return;
    
    const exchangeRate = rechargeCurrency === 'CNY' ? 1 : EXCHANGE_RATE_USD_TO_CNY;
    const baseAmountToAdd = rechargeCurrency === 'CNY' ? amount : amount * exchangeRate;

    const tx = addTransaction(
      amount, 
      `账户余额充值 (${rechargeCurrency})`, 
      'recharge', 
      rechargeCurrency, 
      exchangeRate
    );

    setUserState(prev => ({
      ...prev,
      balance: prev.balance + baseAmountToAdd,
      transactions: [tx, ...prev.transactions]
    }));
    setRechargeAmount('');
    setRechargeCurrency('CNY'); // Reset to default
    setShowRechargeModal(false);
    setToast({ message: `成功充值 ${rechargeCurrency === 'CNY' ? '¥' : '$'}${amount}`, type: 'success' });
  };

  const handleSubscribe = (users: number, costCNY: number) => {
    if (userState.balance < costCNY) {
      alert(`余额不足，需要 ${formatMoney(costCNY)}，请先充值！`);
      setShowRechargeModal(true);
      return;
    }

    const plan = users < 100 ? PlanType.STANDARD : PlanType.PROFESSIONAL;
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    // Subscription records are always in Base Currency (CNY) internally for consistency
    const tx = addTransaction(-costCNY, `订阅${plan === PlanType.STANDARD ? '标准版' : '专业版'} (${users}人/年)`, 'subscription');

    setUserState(prev => ({
      ...prev,
      balance: prev.balance - costCNY,
      isSubscribed: true,
      activePlan: plan,
      userCount: users,
      expiryDate: nextYear.toISOString().split('T')[0],
      transactions: [tx, ...prev.transactions]
    }));
    
    setView('overview');
    setToast({ message: "订阅成功！已自动扣除年度费用。", type: 'success' });
  };

  const handleBuyStorage = () => {
    const costCNY = RESOURCE_PRICING.storagePerGBMonth * 12 * 10; // Buy 10GB for a year
    if (userState.balance < costCNY) {
      alert("余额不足");
      return;
    }

    const tx = addTransaction(-costCNY, '购买存储包 10GB (1年)', 'resource');

    setUserState(prev => ({
      ...prev,
      balance: prev.balance - costCNY,
      storageGB: prev.storageGB + 10,
      transactions: [tx, ...prev.transactions]
    }));
    setToast({ message: "扩容成功！增加 10GB 存储。", type: 'success' });
  };

  const handleBuyTokens = () => {
    const costCNY = RESOURCE_PRICING.tokensPerMillion; // Buy 1M tokens
    if (userState.balance < costCNY) {
      alert("余额不足");
      return;
    }

    const tx = addTransaction(-costCNY, '购买AI Token额度 (100万)', 'resource');

    setUserState(prev => ({
      ...prev,
      balance: prev.balance - costCNY,
      tokensUsed: prev.tokensUsed, // Logic placeholder
      transactions: [tx, ...prev.transactions]
    }));
    setToast({ message: `已购买 100万 Token 额度，扣除 ¥${costCNY}`, type: 'success' });
  };

  const toggleCurrency = () => {
    setUserState(prev => ({
      ...prev,
      displayCurrency: prev.displayCurrency === 'CNY' ? 'USD' : 'CNY'
    }));
  };

  // Helper to get toast styles
  const getToastStyles = (type: 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success':
        return 'bg-white border-green-100 text-green-800';
      case 'error':
        return 'bg-white border-red-100 text-red-800';
      case 'warning':
        return 'bg-white border-yellow-100 text-yellow-800';
    }
  };

  const getToastIcon = (type: 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-600" />;
    }
  };
  
  const getToastBg = (type: 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success': return 'bg-green-100';
      case 'error': return 'bg-red-100';
      case 'warning': return 'bg-yellow-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  Ent
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">企业控制台</h3>
                  <p className="text-xs text-slate-500">ID: 8829103</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-slate-500">账户余额</p>
                  <button onClick={toggleCurrency} className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    <Globe size={12} /> {userState.displayCurrency}
                  </button>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-3">
                  {formatMoney(userState.balance)}
                </div>
                <Button size="sm" className="w-full" onClick={() => setShowRechargeModal(true)}>
                  <Plus size={16} className="mr-1" /> 立即充值
                </Button>
              </div>
            </div>

            <nav className="space-y-1">
              <button 
                onClick={() => setView('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${view === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
              >
                <LayoutDashboard size={18} />
                总览 & 订阅状态
              </button>
              <button 
                onClick={() => setView('subscribe')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${view === 'subscribe' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
              >
                <CreditCard size={18} />
                订阅管理 / 变更
              </button>
              <button 
                onClick={() => setView('resources')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${view === 'resources' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
              >
                <Database size={18} />
                资源用量 (存储/Token)
              </button>
              <button 
                onClick={() => setView('history')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${view === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
              >
                <History size={18} />
                交易记录
              </button>
               <button 
                onClick={() => setView('help')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${view === 'help' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
              >
                <AlertCircle size={18} />
                帮助中心
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* View: Overview */}
            {view === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">概览</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Subscription Card */}
                  <div className={`bg-white p-6 rounded-xl shadow-sm border ${userState.isSubscribed ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200'} relative overflow-hidden group`}>
                     {/* Decorate background if subscribed */}
                     {userState.isSubscribed && (
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none transition-transform group-hover:scale-110"></div>
                     )}

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-1">当前版本</p>
                          {userState.isSubscribed ? (
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                userState.activePlan === PlanType.PROFESSIONAL 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                             }`}>
                                {userState.activePlan === PlanType.PROFESSIONAL ? '专业版 (Professional)' : '标准版 (Standard)'}
                             </span>
                          ) : (
                             <h3 className="text-xl font-bold text-slate-900">未订阅</h3>
                          )}
                        </div>
                        <div className={`p-2 rounded-lg ${userState.isSubscribed ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                          <CreditCard size={20} />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        {userState.isSubscribed ? (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                               <div className="flex items-center gap-2 text-slate-600">
                                  <Users size={16} className="text-slate-400" />
                                  <span className="text-sm">授权用户</span>
                               </div>
                               <span className="font-bold text-slate-900">{userState.userCount} 人</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                               <div className="flex items-center gap-2 text-slate-600">
                                  <Calendar size={16} className="text-slate-400" />
                                  <span className="text-sm">到期日期</span>
                               </div>
                               <span className="font-bold text-slate-900">{userState.expiryDate}</span>
                            </div>
                            <div className="pt-2">
                               <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => setView('subscribe')}>
                                  续费 / 升级
                               </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-sm text-slate-500 mb-4">订阅企业版，解锁全功能 ERP 系统</p>
                            <Button size="md" className="w-full shadow-lg shadow-blue-500/20 animate-pulse" onClick={() => setView('subscribe')}>
                              立即去订阅
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Storage Card */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">云存储空间</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">{userState.storageGB} GB</h3>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                        <Database size={20} />
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-xs text-slate-400">已使用 45%</p>
                    </div>
                  </div>

                  {/* AI Token Card */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">AI Token 使用量</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">245 K</h3>
                      </div>
                      <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                        <Zap size={20} />
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-slate-600">费率: {formatMoney(RESOURCE_PRICING.tokensPerMillion)}/百万Token</p>
                      <p className="text-xs text-slate-400 mt-1">按量计费，从余额扣除</p>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">最近交易</h3>
                    <button onClick={() => setView('history')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部</button>
                  </div>
                  <div className="p-0">
                    {userState.transactions.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {userState.transactions.slice(0, 3).map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                tx.type === 'recharge' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {tx.type === 'recharge' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">{tx.description}</p>
                                <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleString()}</p>
                              </div>
                            </div>
                            <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                              {tx.amount > 0 ? '+' : ''}
                              {tx.currency === 'USD' ? '$' : '¥'}
                              {Math.abs(tx.amount).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500">暂无交易记录</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* View: Subscribe */}
            {view === 'subscribe' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">订阅管理</h2>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                      当前余额: {formatMoney(userState.balance)}
                    </div>
                 </div>
                 <PricingCalculator 
                   showSubscribeButton={true} 
                   onSubscribe={handleSubscribe} 
                   currency={userState.displayCurrency}
                   exchangeRate={EXCHANGE_RATE_USD_TO_CNY}
                 />
              </div>
            )}

            {/* View: Resources */}
            {view === 'resources' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">资源扩展</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Storage Pack */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <Database size={24} />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold">存储加油包</h3>
                         <p className="text-slate-500 text-sm">增加企业网盘容量</p>
                      </div>
                    </div>
                    <div className="mb-6">
                       <p className="text-2xl font-bold text-slate-900">
                         {formatMoney(RESOURCE_PRICING.storagePerGBMonth * 12 * 10)} 
                         <span className="text-sm text-slate-400 font-normal">/年</span>
                       </p>
                       <p className="text-sm text-slate-600 mt-1">增加 10GB 存储空间</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleBuyStorage}>购买 10GB (1年)</Button>
                  </div>

                  {/* Token Pack */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Zap size={24} />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold">AI Token 包</h3>
                         <p className="text-slate-500 text-sm">用于 ERP 智能助手分析</p>
                      </div>
                    </div>
                    <div className="mb-6">
                       <p className="text-2xl font-bold text-slate-900">
                         {formatMoney(RESOURCE_PRICING.tokensPerMillion)}
                       </p>
                       <p className="text-sm text-slate-600 mt-1">增加 100万 Token 额度</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleBuyTokens}>购买 100万 Token</Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-bold mb-1">计费说明</p>
                    <p>所有资源扩展包即时生效。Token 为一次性消耗品，存储空间为年度订阅制。费用直接从账户余额扣除。</p>
                  </div>
                </div>
              </div>
            )}

            {/* View: Transaction History */}
            {view === 'history' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">交易记录</h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" placeholder="搜索交易..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  {userState.transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 font-medium border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">时间</th>
                            <th className="px-6 py-4">交易类型</th>
                            <th className="px-6 py-4">详情</th>
                            <th className="px-6 py-4 text-right">原币金额</th>
                            <th className="px-6 py-4 text-right">入账金额 (CNY)</th>
                            <th className="px-6 py-4 text-center">状态</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {userState.transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                                {new Date(tx.date).toLocaleString()}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {tx.type === 'recharge' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">充值</span>}
                                  {tx.type === 'subscription' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">订阅</span>}
                                  {tx.type === 'resource' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">资源</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-900 font-medium">
                                {tx.description}
                              </td>
                              <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                                {tx.amount > 0 ? '+' : ''}
                                {tx.currency === 'USD' ? '$' : '¥'}
                                {Math.abs(tx.amount).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-right text-slate-500">
                                {tx.baseAmount > 0 ? '+' : ''}
                                ¥{Math.abs(tx.baseAmount).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-green-600 flex items-center justify-center gap-1">
                                  <CheckCircle2 size={14} /> 成功
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                       <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <History size={32} className="opacity-50" />
                       </div>
                       <p>暂无交易记录</p>
                    </div>
                  )}
                </div>
              </div>
            )}

             {/* View: Help Center */}
            {view === 'help' && <HelpCenter />}
          </main>
        </div>
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Wallet className="text-blue-600" /> 账户充值
                </h3>
                <button onClick={() => setShowRechargeModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
             </div>
             
             <div className="space-y-4">
               {/* Currency Selector */}
               <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                 <button 
                   onClick={() => setRechargeCurrency('CNY')}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${rechargeCurrency === 'CNY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                 >
                   CNY (¥)
                 </button>
                 <button 
                   onClick={() => setRechargeCurrency('USD')}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${rechargeCurrency === 'USD' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                 >
                   USD ($)
                 </button>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   充值金额 ({rechargeCurrency})
                 </label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                      {rechargeCurrency === 'CNY' ? '¥' : '$'}
                    </span>
                    <input 
                      type="number" 
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(parseInt(e.target.value) || '')}
                      placeholder="请输入金额"
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-slate-900"
                    />
                 </div>
                 {rechargeCurrency === 'USD' && typeof rechargeAmount === 'number' && rechargeAmount > 0 && (
                   <p className="text-xs text-slate-500 mt-1">
                     预计入账: ¥{(rechargeAmount * EXCHANGE_RATE_USD_TO_CNY).toLocaleString()} (汇率: {EXCHANGE_RATE_USD_TO_CNY})
                   </p>
                 )}
               </div>

               <div className="grid grid-cols-3 gap-3">
                  {[100, 500, 1000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setRechargeAmount(amt)}
                      className="border border-slate-200 hover:border-blue-500 hover:bg-blue-50 py-2 rounded-lg text-sm font-medium text-slate-600 transition-colors"
                    >
                       {rechargeCurrency === 'CNY' ? '¥' : '$'}{amt}
                    </button>
                  ))}
               </div>

               <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-500">
                 <p>· 充值金额将按实时汇率转换为 CNY 存入。</p>
                 <p>· 可用于支付订阅费、存储扩展及API调用。</p>
               </div>

               <Button className="w-full" size="lg" onClick={handleRecharge} disabled={!rechargeAmount || Number(rechargeAmount) <= 0}>
                 确认支付
               </Button>
             </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-5 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${getToastStyles(toast.type)}`}>
             <div className={`p-2 rounded-full ${getToastBg(toast.type)}`}>
               {getToastIcon(toast.type)}
             </div>
             <div>
               <p className="font-bold text-sm">
                 {toast.type === 'success' ? '成功' : toast.type === 'warning' ? '提示' : '注意'}
               </p>
               <p className="text-sm opacity-90">{toast.message}</p>
             </div>
             <button 
               onClick={() => setToast(null)}
               className="ml-4 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
             >
               <X size={16} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};