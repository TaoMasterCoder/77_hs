import React, { useState, useEffect } from 'react';
import { CheckCircle2, Users, Calculator, Info } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { PlanType, Currency } from '../types';
import { Button } from './Button';

interface PricingCalculatorProps {
  onSubscribe?: (users: number, totalCostCNY: number) => void;
  showSubscribeButton?: boolean;
  currency?: Currency;
  exchangeRate?: number; // USD to CNY rate
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  onSubscribe, 
  showSubscribeButton = false,
  currency = 'CNY',
  exchangeRate = 7.2
}) => {
  const [userCount, setUserCount] = useState<number>(50);
  const [activePlan, setActivePlan] = useState<PlanType>(PlanType.STANDARD);

  // Update plan based on user count automatically
  useEffect(() => {
    if (userCount < 100) {
      setActivePlan(PlanType.STANDARD);
    } else {
      setActivePlan(PlanType.PROFESSIONAL);
    }
  }, [userCount]);

  const currentTier = PRICING_TIERS[activePlan];
  
  // Calculate prices based on currency
  const pricePerUserYearRaw = currentTier.pricePerUserYear;
  const pricePerUserYearDisplay = currency === 'CNY' 
    ? pricePerUserYearRaw 
    : pricePerUserYearRaw / exchangeRate;
    
  const annualTotalCNY = userCount * pricePerUserYearRaw;
  const annualTotalDisplay = currency === 'CNY'
    ? annualTotalCNY
    : annualTotalCNY / exchangeRate;

  const symbol = currency === 'CNY' ? '¥' : '$';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCount(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setUserCount(val);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
      
      {/* Left: Configuration */}
      <div className="p-8 md:w-3/5 space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="text-blue-600" />
            <span>费用估算器</span>
          </h3>
          <p className="text-slate-500 mt-2">根据您的企业规模自动匹配最佳版本。按年订阅，弹性扩展。</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              用户数量 (人)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                 <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                    type="number" 
                    min="1" 
                    max="10000"
                    value={userCount}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                 />
              </div>
              <div className="bg-slate-100 px-4 py-3 rounded-lg text-slate-600 font-semibold min-w-[120px] text-center">
                {activePlan === PlanType.STANDARD ? '标准版' : '专业版'}
              </div>
            </div>
          </div>

          <div>
             <input 
               type="range" 
               min="1" 
               max="500" 
               value={userCount} 
               onChange={handleSliderChange}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="flex justify-between text-xs text-slate-400 mt-2">
               <span>1人</span>
               <span>100人 (版本分界线)</span>
               <span>500人+</span>
             </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
             <div className="flex items-start gap-3">
                <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-blue-900">当前匹配：{currentTier.name}</h4>
                  <p className="text-blue-700 text-sm mt-1">{currentTier.description}</p>
                  <div className="mt-3 text-blue-800 text-sm font-medium">
                    单价：<span className="text-lg font-bold">{symbol}{pricePerUserYearDisplay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> /用户/年
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right: Summary & Features */}
      <div className="bg-slate-900 md:w-2/5 p-8 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
          <h4 className="text-slate-300 font-medium uppercase tracking-wider text-sm">预估总费用</h4>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold">{symbol}{annualTotalDisplay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <span className="text-slate-400">/年</span>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-slate-300 mb-4">包含权益：</p>
            {currentTier.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="text-blue-400" size={16} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {showSubscribeButton && (
          <div className="relative z-10 mt-8">
            <Button 
              onClick={() => onSubscribe && onSubscribe(userCount, annualTotalCNY)}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white border-none shadow-lg shadow-blue-900/50"
            >
              立即订阅 / 续费
            </Button>
            <p className="text-center text-xs text-slate-500 mt-3">
              点击将从您的账户余额中扣除 (以CNY结算)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};