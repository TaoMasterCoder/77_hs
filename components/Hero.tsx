import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ChevronRight, Play, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onSchedule: () => void;
}

const HERO_BG_IMAGES = [
  // Tech & Abstract (Blue/Dark Tones) - Similar to 77hub style
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&q=80", 
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
  
  // Modern Enterprise Architecture
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
  
  // Professional Office & Collaboration
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
  
  // Data & Analytics Concept
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
];

const DASHBOARD_SCREENS = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    alt: "Financial Overview",
    label: "实时财务概览"
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    alt: "Data Analytics",
    label: "多维度经营分析"
  },
  {
    src: "https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    alt: "Project Analytics",
    label: "项目全周期看板"
  },
  {
    src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    alt: "Mobile Reports",
    label: "移动端报表中心"
  }
];

export const Hero: React.FC<HeroProps> = ({ onStart, onSchedule }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentDashIndex, setCurrentDashIndex] = useState(0);

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(interval);
  }, []);

  // Rotate dashboard screens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDashIndex((prev) => (prev + 1) % DASHBOARD_SCREENS.length);
    }, 5000); // Rotate screens every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-900 overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 min-h-[800px] flex flex-col justify-center">
      {/* Dynamic Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0">
        {HERO_BG_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900"></div>
        
        {/* Animated abstract blobs */}
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] mix-blend-overlay animate-pulse" style={{ animationDuration: '4s' }}></div>
           <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-overlay animate-pulse" style={{ animationDuration: '7s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-300 text-sm font-medium mb-8 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>下一代企业核心系统 QiQi Cloud 3.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-lg">
          重塑 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">业财一体化</span>
          <br />
          <span className="relative">
            让数据驱动增长
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-600/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed font-medium drop-shadow-md">
          专为现代服务业打造。在一个平台上实现项目管理、智能财务、费控报销与商业智能的无缝连接。告别数据孤岛，实时掌控企业经营全貌。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button 
            size="lg" 
            onClick={onStart} 
            className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/25 px-8 h-14 text-lg"
          >
            免费试用 / 登录
            <ChevronRight size={20} className="ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="glass" 
            className="px-8 h-14 text-lg"
            onClick={onSchedule}
          >
            <Play size={18} className="mr-2 fill-white stroke-white" />
            预约专家演示
          </Button>
        </div>

        {/* Dashboard Preview (Rotating) */}
        <div className="relative mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 perspective-1000">
          {/* Glow behind the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent rounded-2xl blur-3xl -z-10 transform scale-95 translate-y-4"></div>
          
          <div className="relative rounded-xl bg-slate-800/50 p-2 ring-1 ring-white/10 backdrop-blur-sm shadow-2xl transform rotate-x-2 transition-transform hover:rotate-0 duration-700">
            <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-700/50 relative h-[300px] md:h-[500px]">
              {/* Browser Header */}
              <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 px-3 py-0.5 bg-slate-900 rounded-md text-[10px] text-slate-500 font-mono flex-1 text-center max-w-xs mx-auto transition-all duration-500">
                  app.qiqi-cloud.com/dashboard
                </div>
              </div>

              {/* Rotating Images */}
              {DASHBOARD_SCREENS.map((screen, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 pt-8 transition-opacity duration-1000 ease-in-out ${
                    index === currentDashIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                   <img
                    src={screen.src}
                    alt={screen.alt}
                    className="w-full h-full object-cover object-top opacity-90"
                  />
                  {/* Label Badge */}
                  <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                     正在展示：{screen.label}
                  </div>
                </div>
              ))}
              
              {/* Floating Cards (Decorations) - Fixed position */}
              <div className="absolute -right-4 top-24 bg-white rounded-lg shadow-2xl p-4 max-w-[200px] hidden md:block animate-bounce z-30" style={{ animationDuration: '3s' }}>
                 <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><Zap size={16} /></div>
                    <div>
                       <div className="text-xs text-slate-500">项目利润率</div>
                       <div className="text-lg font-bold text-slate-900">+24.5%</div>
                    </div>
                 </div>
                 <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 w-[75%] h-full"></div>
                 </div>
              </div>

              <div className="absolute -left-4 bottom-12 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 max-w-[220px] hidden md:block text-white animate-bounce z-30" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                 <div className="text-xs text-slate-400 mb-2">实时资金预测</div>
                 <div className="flex items-end gap-1">
                    <div className="h-8 w-2 bg-blue-600 rounded-t-sm"></div>
                    <div className="h-12 w-2 bg-blue-600 rounded-t-sm"></div>
                    <div className="h-6 w-2 bg-slate-700 rounded-t-sm"></div>
                    <div className="h-10 w-2 bg-blue-500 rounded-t-sm"></div>
                    <div className="h-14 w-2 bg-indigo-500 rounded-t-sm shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                 </div>
              </div>

              {/* Screen Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {DASHBOARD_SCREENS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentDashIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentDashIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};