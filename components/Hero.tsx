import React from 'react';
import { Button } from './Button';
import { ChevronRight, Play } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
          
          <div className="sm:text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               全新一代 3.0 版本正式发布
             </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">重塑企业核心</span>{' '}
              <span className="block text-blue-600 xl:inline">数字化连接力</span>
            </h1>
            <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              企企云 ERP，专为现代服务业打造。集成项目管理、智能财务、费控报销与商业智能。按需订阅，弹性付费，助力企业实现业财一体化转型。
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
              <Button size="lg" onClick={onStart} className="w-full sm:w-auto shadow-blue-500/30 shadow-lg">
                免费试用 / 登录
                <ChevronRight size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Play size={18} className="mr-2 fill-slate-500 stroke-slate-500" />
                观看演示
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-50">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center p-10">
           {/* Abstract UI representation */}
           <div className="w-full max-w-md aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl rotate-3 opacity-90 relative transform hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-2 bg-white rounded-xl shadow-inner overflow-hidden p-4 grid grid-cols-2 gap-4 opacity-95">
                 <div className="col-span-2 h-8 bg-slate-100 rounded-lg"></div>
                 <div className="h-24 bg-blue-50 rounded-lg"></div>
                 <div className="h-24 bg-purple-50 rounded-lg"></div>
                 <div className="col-span-2 h-32 bg-slate-50 rounded-lg mt-2"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -left-8 bottom-12 bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">¥</div>
                 <div>
                   <p className="text-xs text-slate-500">本月营收预估</p>
                   <p className="font-bold text-slate-900">+128.5%</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};