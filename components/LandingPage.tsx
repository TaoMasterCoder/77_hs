import React from 'react';
import { Hero } from './Hero';
import { PricingSection } from './PricingSection';
import { 
  BarChart3, 
  Layers, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  LayoutGrid,
  PieChart,
  Briefcase
} from 'lucide-react';
import { Button } from './Button';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <main className="bg-white">
      <Hero onStart={onStart} />
      
      {/* Section: Trusted By (Logo Cloud) */}
      <section className="py-10 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
             深受 5,000+ 创新型企业信赖
           </p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['BlueFocus', 'Ogilvy', 'Hylink', 'Dentsu', 'Publicis', 'WPP'].map((name, i) => (
                 <span key={i} className="text-xl md:text-2xl font-black text-slate-700 font-sans tracking-tighter hover:text-blue-600 cursor-default select-none">
                    {name}
                 </span>
              ))}
           </div>
        </div>
      </section>

      {/* Section: Bento Grid Features */}
      <section className="py-24">
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
               <div className="md:row-span-2 bg-slate-900 rounded-3xl p-8 relative overflow-hidden group text-white hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 z-0"></div>
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4 group-hover:rotate-12 transition-transform">
                        <Smartphone size={24} />
                     </div>
                     <h3 className="text-2xl font-bold mb-2">移动端原生体验</h3>
                     <p className="text-slate-400 mb-8">
                        无论身在何处，业务审批、报销填报、数据查询触手可及。
                     </p>
                     <div className="mt-auto flex justify-center">
                        <div className="w-[200px] h-[300px] bg-slate-800 rounded-t-3xl border-t-4 border-x-4 border-slate-700 relative transform translate-y-4 group-hover:translate-y-2 transition-transform">
                           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-b-xl"></div>
                           <div className="p-4 mt-6 space-y-3">
                              <div className="h-20 bg-slate-700/50 rounded-lg w-full"></div>
                              <div className="h-20 bg-slate-700/50 rounded-lg w-full"></div>
                              <div className="h-20 bg-slate-700/50 rounded-lg w-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Standard Item: Smart Finance */}
               <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                     <PieChart size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">业财一体化</h3>
                  <p className="text-slate-500 text-sm">业务单据自动生成凭证，告别繁琐的手工录入。财务数据实时准确。</p>
               </div>

               {/* Standard Item: BI */}
               <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-green-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                     <BarChart3 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">智能 BI 决策</h3>
                  <p className="text-slate-500 text-sm">预置多维度经营报表，现金流、利润率实时测算，辅助科学决策。</p>
               </div>
            </div>
         </div>
      </section>

      {/* Section: Solution / Tech Feel */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         {/* Background Effects */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-bold mb-6">
                     <Zap size={12} /> 核心技术架构
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                     打破传统 ERP 的<br />
                     <span className="text-blue-400">僵化与边界</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                     企企云服务采用最新的云原生微服务架构。不同于传统软件的"大单体"，我们支持按需配置、弹性扩展与秒级迭代。
                  </p>
                  
                  <div className="space-y-6">
                     {[
                        { title: "OpenAPI 开放平台", desc: "轻松连接 CRM、OA、HR 等第三方系统，消除数据孤岛。" },
                        { title: "低代码配置引擎", desc: "无需开发人员，业务部门即可拖拽生成表单与审批流。" },
                        { title: "企业级安全合规", desc: "等保三级认证，全链路数据加密，每日自动容灾备份。" }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="mt-1 w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                              <CheckCircle2 size={14} />
                           </div>
                           <div>
                              <h4 className="text-white font-bold">{item.title}</h4>
                              <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="lg:w-1/2 w-full">
                  <div className="relative">
                     {/* Abstract Tech Visualization */}
                     <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-10">
                           {Array.from({ length: 36 }).map((_, i) => (
                              <div key={i} className="bg-white/20 rounded-sm"></div>
                           ))}
                        </div>
                        
                        {/* Central Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 rounded-full border-2 border-blue-500 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                           <LayoutGrid className="text-blue-400" size={40} />
                        </div>

                        {/* Orbiting Nodes */}
                        {[0, 72, 144, 216, 288].map((deg, i) => (
                           <div key={i} className="absolute top-1/2 left-1/2 w-full h-1 bg-transparent" style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}>
                              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border border-slate-600 rounded-xl flex items-center justify-center text-white z-10 shadow-lg animate-bounce" style={{ animationDelay: `${i * 0.5}s` }}>
                                 {i === 0 && <Briefcase size={20} className="text-purple-400" />}
                                 {i === 1 && <PieChart size={20} className="text-green-400" />}
                                 {i === 2 && <Smartphone size={20} className="text-orange-400" />}
                                 {i === 3 && <Globe size={20} className="text-cyan-400" />}
                                 {i === 4 && <ShieldCheck size={20} className="text-red-400" />}
                              </div>
                              {/* Connecting Line */}
                              <div className="absolute right-20 top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                           </div>
                        ))}
                     </div>
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
               <Button size="lg" variant="outline" className="h-14 px-10 text-lg">
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