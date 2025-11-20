import React from 'react';
import { Building2, TrendingUp, Users, Globe, Star } from 'lucide-react';
import { Button } from './Button';

const industries = [
  { id: 'media', name: '广告传媒' },
  { id: 'it', name: '软件信息' },
  { id: 'consulting', name: '咨询服务' },
  { id: 'engineering', name: '工程技术' },
];

const cases = [
  {
    company: "未来视界传媒",
    industry: "广告传媒",
    logo: "M",
    color: "bg-indigo-600",
    title: "项目利润率提升 30%",
    desc: "通过企企云ERP实现项目全流程精细化核算，精准把控每一笔执行费用，让创意变现更清晰。",
    tags: ["项目核算", "费控报销"]
  },
  {
    company: "智汇科技",
    industry: "软件信息",
    logo: "T",
    color: "bg-blue-600",
    title: "研发效能与成本透明化",
    desc: "解决了研发人员工时统计难、项目成本分摊不准的痛点，实现了以项目为核心的阿米巴经营。",
    tags: ["工时管理", "多维度报表"]
  },
  {
    company: "卓越咨询集团",
    industry: "咨询服务",
    logo: "E",
    color: "bg-emerald-600",
    title: "从线索到回款周期缩短 20天",
    desc: "打通 CRM 与 财务系统，实现了从商机跟进、合同签订到开票回款的全链路自动化管理。",
    tags: ["业财一体", "合同管理"]
  },
  {
    company: "建安工程",
    industry: "工程技术",
    logo: "C",
    color: "bg-orange-600",
    title: "异地项目资金风险降低",
    desc: "借助移动端现场管理与资金预算强控，有效解决了全国多工地资金使用不透明的问题。",
    tags: ["资金管理", "移动协同"]
  },
  {
    company: "新锐互动",
    industry: "广告传媒",
    logo: "N",
    color: "bg-pink-600",
    title: "告别贴票烦恼",
    desc: "全面推行电子发票与智能报销，员工满意度大幅提升，财务审核效率提高 80%。",
    tags: ["智能报销", "发票管理"]
  },
  {
    company: "云端数据",
    industry: "软件信息",
    logo: "D",
    color: "bg-sky-600",
    title: "IPO 审计一次通过",
    desc: "规范的财务核算体系与完整的数据链条，帮助企业在上市审计过程中快速提供准确数据。",
    tags: ["合规审计", "财务规范"]
  }
];

export const Cases: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [activeTab, setActiveTab] = React.useState('all');

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => {
        const ind = industries.find(i => i.id === activeTab);
        return ind && c.industry === ind.name;
      });

  return (
    <div className="bg-white min-h-screen">
       {/* Hero Section */}
       <div className="bg-slate-50 pt-24 pb-20 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
              见证 <span className="text-blue-600">数字化转型</span> 的力量
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              企企云服务已助力数千家现代服务型企业实现管理升级。从初创团队到行业巨头，我们与客户共同成长。
            </p>
         </div>
       </div>

       {/* Stats */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="text-center">
               <div className="flex justify-center mb-3 text-blue-600"><Building2 size={28} /></div>
               <div className="text-3xl font-bold text-slate-900">5,000+</div>
               <div className="text-sm text-slate-500 mt-1">服务企业</div>
             </div>
             <div className="text-center">
               <div className="flex justify-center mb-3 text-green-600"><Users size={28} /></div>
               <div className="text-3xl font-bold text-slate-900">500,000+</div>
               <div className="text-sm text-slate-500 mt-1">活跃用户</div>
             </div>
             <div className="text-center">
               <div className="flex justify-center mb-3 text-purple-600"><TrendingUp size={28} /></div>
               <div className="text-3xl font-bold text-slate-900">100亿+</div>
               <div className="text-sm text-slate-500 mt-1">管理资金规模</div>
             </div>
             <div className="text-center">
               <div className="flex justify-center mb-3 text-orange-600"><Globe size={28} /></div>
               <div className="text-3xl font-bold text-slate-900">30+</div>
               <div className="text-sm text-slate-500 mt-1">覆盖行业</div>
             </div>
          </div>
       </div>

       {/* Logo Wall - New Section */}
       <div className="py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
               深受行业领军企业信赖
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Simulated Logos */}
               {['GROUPM', 'OGILVY', 'DENTSU', 'BLUEFOCUS', 'PUBLICIS', 'HYLINK'].map((logo, i) => (
                  <div key={i} className="text-2xl font-black text-slate-800 font-sans tracking-tighter">{logo}</div>
               ))}
            </div>
         </div>
       </div>

       {/* Filter Tabs */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
             <button 
               onClick={() => setActiveTab('all')}
               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
             >
               全部案例
             </button>
             {industries.map(ind => (
               <button 
                 key={ind.id}
                 onClick={() => setActiveTab(ind.id)}
                 className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === ind.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                 {ind.name}
               </button>
             ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
             {filteredCases.map((item, index) => (
               <div key={index} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="p-8 flex-1">
                     <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-xl`}>
                           {item.logo}
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900">{item.company}</h3>
                           <p className="text-xs text-slate-500">{item.industry}</p>
                        </div>
                     </div>
                     <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                       {item.title}
                     </h4>
                     <p className="text-slate-600 text-sm leading-relaxed mb-6">
                       "{item.desc}"
                     </p>
                  </div>
                  <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
                     {item.tags.map((tag, i) => (
                       <span key={i} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-500">
                         #{tag}
                       </span>
                     ))}
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Testimonials - New Section */}
       <div className="bg-blue-900 py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">客户之声</h2>
                <p className="text-blue-200 max-w-2xl mx-auto">听听这些先行者如何评价企企云服务带来的改变</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                   { text: "企企云ERP帮助我们将项目核算颗粒度从部门级细化到了任务级，利润提升肉眼可见。", author: "李总", role: "未来视界传媒 CEO" },
                   { text: "以前财务月底加班三天，现在系统自动出报表，实现了真正的业财一体化。", author: "张总监", role: "智汇科技 CFO" },
                   { text: "界面非常现代，员工上手很快，移动端报销体验极佳，大家都很喜欢用。", author: "王经理", role: "卓越咨询 运营总监" }
                ].map((t, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                      <div className="flex gap-1 text-yellow-400 mb-6">
                         {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-lg text-blue-50 italic mb-6 leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
                            {t.author[0]}
                         </div>
                         <div>
                            <div className="font-bold">{t.author}</div>
                            <div className="text-xs text-blue-200">{t.role}</div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* CTA */}
       <div className="bg-white py-20">
         <div className="max-w-5xl mx-auto px-4 text-center">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                   <h2 className="text-3xl font-bold text-white mb-6">您的企业也可以如此高效</h2>
                   <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                      无论您是快速成长的初创公司，还是寻求变革的行业领袖，企企云服务都能为您提供最适合的数字化解决方案。
                   </p>
                   <Button variant="outline" size="lg" className="bg-white text-blue-600 border-white hover:bg-blue-50 font-bold px-8 h-14" onClick={onStart}>
                      开启免费试用
                   </Button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};