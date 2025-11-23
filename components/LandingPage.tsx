import React from 'react';
import { Hero } from './Hero';
import { PricingSection } from './PricingSection';
import { 
  BarChart3, 
  Layers, 
  Smartphone, 
  Globe, 
  Zap,
  LayoutGrid,
  PieChart,
  Megaphone,
  Feather,
  Share2,
  Building
} from 'lucide-react';
import { Button } from './Button';

interface LandingPageProps {
  onStart: () => void;
  onSchedule: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onSchedule }) => {
  
  const partners = [
    { name: 'BlueFocus', label: '蓝色光标', icon: <Megaphone size={24} />, color: 'text-blue-500' },
    { name: 'Ogilvy', label: '奥美集团', icon: <Feather size={24} />, color: 'text-red-500' },
    { name: 'Hylink', label: '华扬联众', icon: <Share2 size={24} />, color: 'text-indigo-500' },
    { name: 'Dentsu', label: '电通中国', icon: <Globe size={24} />, color: 'text-sky-500' },
    { name: 'Publicis', label: '阳狮集团', icon: <Zap size={24} />, color: 'text-yellow-500' },
    { name: 'WPP', label: 'WPP集团', icon: <LayoutGrid size={24} />, color: 'text-slate-600' }
  ];

  return (
    <main className="bg-white">
      <Hero onStart={onStart} onSchedule={onSchedule} />
      
      {/* Section: Trusted By (Strategic Partners) */}
      <section className="py-16 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-4">
               <span className="h-px w-8 bg-slate-300"></span>
               战略合作伙伴与行业客户
               <span className="h-px w-8 bg-slate-300"></span>
             </h3>
           </div>
           
           {/* Logo Wall Grid */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((client, i) => (
                 <div key={i} className="group flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
                    <div className={`mb-3 ${client.color} bg-slate-50 p-3 rounded-full group-hover:bg-white group-hover:scale-110 transition-all duration-300`}>
                       {client.icon}
                    </div>
                    <span className="text-lg font-black text-slate-700 font-sans tracking-tight group-hover:text-slate-900">
                       {client.name}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
                       {client.label}
                    </span>
                 </div>
              ))}
           </div>
           
           <div className="mt-10 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                 <Building size={12} />
                 以上企业均已部署企企云服务作为核心业务管理系统
              </p>
           </div>
        </div>
      </section>

      {/* Section: Bento Grid Features */}
      <section className="py-24" id="tour-features">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-2">全场景覆盖</h2>
               <p className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                 不仅仅是 ERP，<br/>更是企业的<span className="text-blue-600">数字神经系统</span>
               </p>
               <p className="text-lg text-slate-500">
                 打通业务与财务的任督二脉。从项目立项到最终收款，每一个环节都在您的掌控之中。
               </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
               
               {/* Large Item: Project Management */}
               <div className="md:col-span-2 bg-slate-50 rounded-3xl p-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col md:flex-row">
                  <div className="p-8 flex flex-col justify-center md:w-1/2 z-10 relative">
                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                        <Layers size={24} />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-2">项目全生命周期管理</h3>
                     <p className="text-slate-500">从商机、立项、计划、执行到验收。实时监控进度与风险，确保项目按时交付。</p>
                  </div>
                  <div className="md:w-1/2 h-48 md:h-auto relative overflow-hidden">
                     {/* Fade Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-transparent z-10 hidden md:block"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 md:hidden block"></div>
                     <img 
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        alt="Project Planning Team"
                     />
                  </div>
               </div>

               {/* Tall Item: Mobile */}
               <div className="md:row-span-2 bg-slate-900 rounded-3xl p-0 relative overflow-hidden group text-white hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-slate-950 z-0"></div>
                  
                  <div className="relative z-20 p-8 h-full flex flex-col">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                           <Smartphone size={20} />
                        </div>
                        <span className="text-sm font-semibold text-blue-200 tracking-wider uppercase">Mobile First</span>
                     </div>
                     
                     <h3 className="text-3xl font-bold mb-2 leading-tight">移动端<br/>原生体验</h3>
                     <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                        打破时空限制。无论是审批、报表还是即时沟通，极致流畅的操作体验，让管理触手可及。
                     </p>
                     
                     {/* Professional Mobile Image */}
                     <div className="mt-auto relative w-full h-[320px] flex justify-center">
                        <div className="relative w-[240px] transform transition-transform duration-500 group-hover:-translate-y-2">
                           {/* Phone Frame Glow */}
                           <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                           
                           {/* Phone Image */}
                           <img 
                              src="https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=800&auto=format&fit=crop" 
                              alt="Mobile App Interface"
                              className="relative z-10 w-full h-full object-cover rounded-t-3xl shadow-2xl border-4 border-slate-800 border-b-0 mask-image-gradient-to-b"
                           />
                           
                           {/* Floating Element */}
                           <div className="absolute -right-8 top-12 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-lg shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                 <span className="text-xs font-medium">审批通过</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Standard Item: Smart Finance */}
               <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                        <PieChart size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">业财一体化</h3>
                     <p className="text-slate-500 text-sm">业务单据自动生成凭证，告别繁琐的手工录入。财务数据实时准确。</p>
                  </div>
               </div>

               {/* Standard Item: BI */}
               <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-green-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                        <BarChart3 size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">智能 BI 决策</h3>
                     <p className="text-slate-500 text-sm">预置多维度经营报表，现金流、利润率实时测算，辅助科学决策。</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <PricingSection />
      
      {/* Modern CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
               从今天开始，<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  重构您的企业核心竞争力
               </span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
               无需漫长的实施周期，注册即可使用。加入 5,000+ 行业领先企业的行列，让数据驱动每一次决策。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-lg shadow-xl" onClick={onStart}>
                  立即免费试用
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-10 text-lg" onClick={onSchedule}>
                  联系销售顾问
               </Button>
            </div>
         </div>
         
         {/* Decor */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -z-10 opacity-60"></div>
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100 rounded-full blur-[100px] -z-10 opacity-60"></div>
      </section>
    </main>
  );
};