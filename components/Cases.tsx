import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Globe, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Quote,
  Briefcase,
  Layers,
  X,
  BarChart,
  Clock,
  ShieldCheck,
  Zap,
  Share2,
  Cpu
} from 'lucide-react';
import { Button } from './Button';

// --- Data Definitions ---

const industries = [
  { id: 'advertising', name: '广告传媒', icon: <Globe size={16} /> },
  { id: 'tech', name: '软件信息', icon: <Users size={16} /> },
  { id: 'consulting', name: '咨询服务', icon: <Briefcase size={16} /> },
  { id: 'engineering', name: '工程设计', icon: <Layers size={16} /> },
];

const LOGO_WALL = [
  { name: 'BlueFocus', icon: <Globe size={28} />, color: 'text-blue-600' },
  { name: 'Publicis Groupe', icon: <Layers size={28} />, color: 'text-orange-600' },
  { name: 'Dentsu', icon: <Zap size={28} />, color: 'text-yellow-500' },
  { name: 'Hylink', icon: <Share2 size={28} />, color: 'text-indigo-600' },
  { name: 'H&S', icon: <Building2 size={28} />, color: 'text-slate-700' },
  { name: 'TechMahindra', icon: <Cpu size={28} />, color: 'text-red-600' },
];

interface CaseDetail {
  background: string;
  implementation: { title: string; desc: string; icon: any }[];
  quote: string;
  quoteAuthor: string;
  metrics: { label: string; value: string; desc: string }[];
}

interface CaseStudy {
  id: number;
  company: string;
  industry: string;
  industryId: string;
  logo: string;
  color: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  detail: CaseDetail;
}

const cases: CaseStudy[] = [
  {
    id: 1,
    company: "蓝色光标 (BlueFocus)",
    industry: "广告传媒",
    industryId: "advertising",
    logo: "B",
    color: "bg-blue-600",
    title: "万人级企业的业财一体化实践",
    challenge: "随着业务全球化扩张，集团旗下拥有上百家分子公司，原有系统无法支撑多币种、多准则核算。项目利润核算滞后严重，通常需要等到次月15号才能出具报表，集团难以实时掌握全球资金状况。",
    solution: "引入企企云 ERP，重构项目主数据，实现了从商机、立项、执行到回款的全流程数字化闭环。对接全球银行系统，实现资金流向的透明可视。",
    results: ["月结时间从 15天 缩短至 5天", "项目利润核算准确率提升至 100%", "全球资金可视率 100%"],
    tags: ["全球化财务", "项目盈亏", "资金管理"],
    detail: {
      background: "作为亚洲最大的营销传播集团，蓝色光标业务遍布全球。在数字化转型的浪潮中，如何统一管理全球分子公司的业务与财务数据，成为了亟待解决的难题。",
      implementation: [
        { title: "主数据统一", desc: "建立了集团统一的客户、供应商与项目主数据标准，打通了 CRM 与 ERP 的数据壁垒。", icon: <Building2 /> },
        { title: "自动化核算", desc: "基于业务单据自动生成财务凭证，实现了 95% 以上的凭证自动化率。", icon: <BarChart /> },
        { title: "移动化报销", desc: "全员推广移动端报销与费控，大幅降低了财务审核工作量。", icon: <Clock /> }
      ],
      quote: "企企云 ERP 帮助我们将项目核算颗粒度从部门级细化到了任务级，利润提升肉眼可见。现在的经营决策完全基于实时数据。",
      quoteAuthor: "李总 - 财务总监",
      metrics: [
        { label: "月结提速", value: "67%", desc: "财务关账时间大幅缩短" },
        { label: "凭证自动化", value: "95%", desc: "减少人工录入错误" },
        { label: "资金利用率", value: "20%+", desc: "全球资金统筹效率提升" }
      ]
    }
  },
  {
    id: 2,
    company: "微创软件",
    industry: "软件信息",
    industryId: "tech",
    logo: "W",
    color: "bg-purple-600",
    title: "IT 服务行业的资源精细化管理",
    challenge: "人员外包与交付项目并行，资源调度困难。经常出现人员闲置或过度承诺，导致交付成本过高，毛利被吞噬。缺乏统一的工时管理系统，成本核算粗糙。",
    solution: "建立全公司的资源池，基于技能标签进行智能调度。通过资源日历实时监控人员负荷，实现跨项目的人力资源动态平衡。全员实施精细化工时填报。",
    results: ["人员利用率提升 15%", "交付成本降低 10%", "资源调配耗时减少 50%"],
    tags: ["资源调度", "交付管理", "人效分析"],
    detail: {
      background: "微创软件拥有数千名技术人员，服务于全球众多 500 强企业。人员是公司最大的资产，也是最大的成本中心。",
      implementation: [
        { title: "资源池建设", desc: "将所有技术人员纳入统一资源池，打标签、定级别，实现可视化查询。", icon: <Users /> },
        { title: "智能调度", desc: "系统根据项目需求自动推荐合适人员，避免资源冲突。", icon: <Layers /> },
        { title: "工时与成本", desc: "工时直连成本核算，每一个项目的投入产出比都清晰可见。", icon: <TrendingUp /> }
      ],
      quote: "以前每到月底财务就要加班三天做报表，现在系统自动出具，实现了真正的业财一体化。团队可以将精力集中在业务支持上。",
      quoteAuthor: "张总 - CFO",
      metrics: [
        { label: "利用率提升", value: "15%", desc: "减少人员闲置浪费" },
        { label: "毛利率增长", value: "8%", desc: "精细化控本带来的直接收益" },
        { label: "调度效率", value: "2x", desc: "资源匹配速度翻倍" }
      ]
    }
  },
  {
    id: 3,
    company: "君智咨询",
    industry: "咨询服务",
    industryId: "consulting",
    logo: "J",
    color: "bg-emerald-600",
    title: "咨询项目的全生命周期掌控",
    challenge: "长期咨询项目进度难以量化，回款节点控制不严，差旅费用报销繁琐，导致现金流压力大且员工体验不佳。",
    solution: "以合同为主线，自动触发收款提醒。实施移动端智能费控，OCR自动识别发票，预算前置管控，差旅标准自动校验。",
    results: ["DSO (回款周期) 缩短 20 天", "项目按时交付率提升 25%", "员工报销时长缩短 80%"],
    tags: ["合同管理", "智能费控", "现金流优化"],
    detail: {
      background: "君智咨询作为顶尖的战略咨询公司，顾问团队频繁出差。高效的费用管理与精准的项目进度把控是其运营核心。",
      implementation: [
        { title: "合同全生命周期", desc: "从商机到回款，所有节点系统自动提醒，杜绝漏收款。", icon: <ShieldCheck /> },
        { title: "智能费控", desc: "对接商旅平台，机票酒店统一预订，无需员工垫资。", icon: <Briefcase /> },
        { title: "项目看板", desc: "管理者随时查看项目里程碑达成情况。", icon: <BarChart /> }
      ],
      quote: "界面非常现代，员工上手很快。特别是移动端报销体验极佳，拍照识别发票、一键提交，大家都很喜欢用。",
      quoteAuthor: "王经理 - 运营负责人",
      metrics: [
        { label: "回款周期", value: "-20天", desc: "现金流显著改善" },
        { label: "报销效率", value: "5x", desc: "报销处理时间大幅缩短" },
        { label: "员工满意度", value: "98%", desc: "极佳的移动端体验" }
      ]
    }
  },
  {
    id: 4,
    company: "天华设计",
    industry: "工程设计",
    industryId: "engineering",
    logo: "T",
    color: "bg-orange-600",
    title: "大型设计院的数字化经营转型",
    challenge: "由于缺乏统一的项目管理平台，各分院数据割裂，集团难以掌握真实的经营状况。工时填报不规范，成本分摊不准。",
    solution: "统一部署企企管理云，打通各分院数据孤岛。推广全员移动端工时填报，自动归集项目人力成本，实现集团层面的经营分析驾驶舱。",
    results: ["数据统计效率提升 10 倍", "管理费用降低 15%", "决策响应速度大幅提升"],
    tags: ["集团管控", "经营分析", "工时管理"],
    detail: {
      background: "天华设计是中国领先的建筑设计公司。随着规模扩大，各分公司的管理标准不一成为了集团化管控的障碍。",
      implementation: [
        { title: "集团管控", desc: "统一数据标准与审批流程，实现集团对分院的穿透式管理。", icon: <Building2 /> },
        { title: "工时管理", desc: "规范化设计人员工时填报，准确核算项目人力成本。", icon: <Clock /> },
        { title: "经营驾驶舱", desc: "为高层提供实时的经营分析报表，支持科学决策。", icon: <BarChart /> }
      ],
      quote: "数据的透明化让我们第一次看清了每一个项目的真实盈亏，这对于设计企业的精细化运营至关重要。",
      quoteAuthor: "陈总 - 运营副总裁",
      metrics: [
        { label: "统计效率", value: "10x", desc: "从人工汇总到实时呈现" },
        { label: "管理费用", value: "-15%", desc: "流程优化带来的降本" },
        { label: "数据准确率", value: "99%", desc: "单一数据源消除了误差" }
      ]
    }
  },
  {
    id: 5,
    company: "奥美 (Ogilvy)",
    industry: "广告传媒",
    industryId: "advertising",
    logo: "O",
    color: "bg-red-600",
    title: "创意人的智能工时与费控",
    challenge: "创意人员反感繁琐的填单工作，导致工时与费用归集不准，难以评估客户服务真实成本。",
    solution: "通过移动端语音报销与智能工时填报，大幅降低员工操作成本，数据自动沉淀。",
    results: ["报销处理效率提升 80%", "员工满意度提升 30%", "客户盈利分析实时化"],
    tags: ["智能费控", "移动办公"],
    detail: {
      background: "奥美是全球知名的广告公司。如何让创意人员在不被繁琐流程打扰的前提下完成管理动作，是系统建设的重点。",
      implementation: [
        { title: "极简体验", desc: "移动端优先设计，支持语音录入、拍照识别，极大简化操作。", icon: <Users /> },
        { title: "客户盈利分析", desc: "准确归集服务各客户的工时与费用，精准评估客户价值。", icon: <TrendingUp /> },
        { title: "自动化合规", desc: "系统内置合规规则，违规费用自动拦截。", icon: <ShieldCheck /> }
      ],
      quote: "企企云 ERP 是我见过的最懂用户的企业软件，它真正站在员工的角度思考问题。",
      quoteAuthor: "David - 创意总监",
      metrics: [
        { label: "报销效率", value: "+80%", desc: "从填单到打款的全流程提速" },
        { label: "客户分析", value: "实时", desc: "随时查看客户盈亏" },
        { label: "合规风险", value: "0", desc: "系统自动拦截违规报销" }
      ]
    }
  },
  {
    id: 6,
    company: "汉得信息",
    industry: "软件信息",
    industryId: "tech",
    logo: "H",
    color: "bg-indigo-600",
    title: "敏捷研发团队的成本透明化",
    challenge: "敏捷开发模式下，需求变更高频，传统的预算管理模式无法适应，成本失控风险高。",
    solution: "实施动态预算控制，基于 Sprint 进行成本归集与滚动预测，实时预警。",
    results: ["预算偏差率控制在 5% 以内", "研发效能透明化", "项目ROI清晰可见"],
    tags: ["动态预算", "敏捷成本"],
    detail: {
      background: "作为国内领先的数字化服务商，汉得信息的研发团队面临着快速变化的市场需求与严格的成本控制双重挑战。",
      implementation: [
        { title: "动态预算", desc: "支持按月、按周甚至按 Sprint 调整预算，适应敏捷节奏。", icon: <TrendingUp /> },
        { title: "研发效能", desc: "将工时与代码产出关联，分析研发效能与成本结构。", icon: <BarChart /> },
        { title: "ROI 分析", desc: "清晰计算每个研发项目的投入产出比，指导产品决策。", icon: <Briefcase /> }
      ],
      quote: "动态预算功能非常强大，完美适配了我们敏捷开发的节奏，让成本控制不再是业务的绊脚石。",
      quoteAuthor: "刘总 - 研发副总裁",
      metrics: [
        { label: "预算偏差", value: "<5%", desc: "精准的成本预测与控制" },
        { label: "ROI 清晰度", value: "100%", desc: "每一分研发投入都有据可查" },
        { label: "决策响应", value: "即时", desc: "数据驱动产品迭代" }
      ]
    }
  }
];

const testimonials = [
  {
    text: "企企云 ERP 帮助我们将项目核算颗粒度从部门级细化到了任务级，利润提升肉眼可见。现在的经营决策完全基于实时数据。",
    author: "李总",
    role: "蓝色光标 财务总监",
    avatar: "L"
  },
  {
    text: "以前每到月底财务就要加班三天做报表，现在系统自动出具，实现了真正的业财一体化。团队可以将精力集中在业务支持上。",
    author: "张总",
    role: "微创软件 CFO",
    avatar: "Z"
  },
  {
    text: "界面非常现代，员工上手很快。特别是移动端报销体验极佳，拍照识别发票、一键提交，大家都很喜欢用。",
    author: "王经理",
    role: "君智咨询 运营负责人",
    avatar: "W"
  }
];

// --- Components ---

const CaseDetailModal: React.FC<{ c: CaseStudy; onClose: () => void; onSchedule: () => void }> = ({ c, onClose, onSchedule }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative min-h-screen flex items-center justify-center p-0 md:p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
           
           {/* Close Button */}
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full text-slate-700 md:text-white transition-colors"
           >
             <X size={24} />
           </button>

           {/* Left Sidebar (Hero) */}
           <div className={`w-full md:w-1/3 ${c.color} p-8 md:p-12 text-white flex flex-col relative`}>
              <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <div className="relative z-10 mt-10 md:mt-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl font-bold mb-8 shadow-lg">
                  {c.logo}
                </div>
                <h2 className="text-3xl font-bold mb-2">{c.company}</h2>
                <p className="text-white/80 font-medium text-lg mb-8">{c.industry}</p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">核心挑战</p>
                    <p className="text-sm leading-relaxed text-white/90">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">应用标签</p>
                    <div className="flex flex-wrap gap-2">
                       {c.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 bg-white/20 rounded text-xs backdrop-blur-sm">{tag}</span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-8 relative z-10 hidden md:block">
                 <div className="flex items-center gap-3 text-white/80">
                    <Globe size={16} />
                    <span className="text-sm">www.example.com</span>
                 </div>
              </div>
           </div>

           {/* Right Content */}
           <div className="w-full md:w-2/3 bg-white p-8 md:p-12 overflow-y-auto max-h-[90vh]">
              
              <div className="max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6">
                  <Star size={14} className="fill-blue-700" /> 成功案例详情
                </span>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">{c.title}</h1>
                
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  {c.detail.background}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-12 border-y border-slate-100 py-8">
                  {c.detail.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1">{m.value}</div>
                      <div className="text-sm font-bold text-slate-900">{m.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{m.desc}</div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" /> 解决方案与落地
                </h3>
                
                <div className="space-y-6 mb-12">
                  {c.detail.implementation.map((imp, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 p-2 bg-slate-50 rounded-lg text-blue-600 h-fit">
                         {React.cloneElement(imp.icon, { size: 20 })}
                       </div>
                       <div>
                         <h4 className="font-bold text-slate-900">{imp.title}</h4>
                         <p className="text-slate-600 text-sm mt-1 leading-relaxed">{imp.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-8 relative">
                   <Quote className="absolute top-4 left-4 text-slate-200 -z-0" size={48} />
                   <p className="relative z-10 text-lg italic text-slate-700 mb-4">"{c.detail.quote}"</p>
                   <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                        {c.logo}
                      </div>
                      <div>
                         <div className="font-bold text-slate-900 text-sm">{c.detail.quoteAuthor}</div>
                         <div className="text-xs text-slate-500">{c.company}</div>
                      </div>
                   </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                   <h4 className="font-bold text-slate-900 mb-4">准备好开启您的转型之旅了吗？</h4>
                   <Button size="lg" onClick={onSchedule}>预约专家咨询</Button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const Cases: React.FC<{ onStart: () => void; onSchedule: () => void }> = ({ onStart, onSchedule }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => c.industryId === activeTab);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
       
       {/* 1. Hero Section */}
       <section className="bg-slate-50 pt-24 pb-20 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">
               <Star size={14} className="fill-blue-700" /> 客户成功故事
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              见证 <span className="text-blue-600 relative whitespace-nowrap">
                数字化转型
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> 的力量
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              企企云服务已助力超过 5,000 家现代服务型企业实现管理升级。从初创团队到行业巨头，我们与客户共同成长。
            </p>
         </div>
       </section>

       {/* 2. Stats Banner */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="text-center group">
               <div className="flex justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform"><Building2 size={32} /></div>
               <div className="text-3xl font-bold text-slate-900">5,000+</div>
               <div className="text-sm text-slate-500 mt-1 font-medium">服务企业</div>
             </div>
             <div className="text-center group">
               <div className="flex justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform"><Users size={32} /></div>
               <div className="text-3xl font-bold text-slate-900">50w+</div>
               <div className="text-sm text-slate-500 mt-1 font-medium">活跃用户</div>
             </div>
             <div className="text-center group">
               <div className="flex justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform"><TrendingUp size={32} /></div>
               <div className="text-3xl font-bold text-slate-900">100亿+</div>
               <div className="text-sm text-slate-500 mt-1 font-medium">管理资金规模</div>
             </div>
             <div className="text-center group">
               <div className="flex justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform"><Globe size={32} /></div>
               <div className="text-3xl font-bold text-slate-900">30+</div>
               <div className="text-sm text-slate-500 mt-1 font-medium">覆盖行业</div>
             </div>
          </div>
       </div>

       {/* 3. Logo Wall */}
       <div className="py-16 bg-white border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-10">
               深受行业领军企业信赖
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
               {LOGO_WALL.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                     <div className={`p-3 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 ${item.color}`}>
                        {item.icon}
                     </div>
                     <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</span>
                  </div>
               ))}
            </div>
         </div>
       </div>

       {/* 4. Case Studies Filter & Grid */}
       <section className="bg-slate-50 py-20 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
               <button 
                 onClick={() => setActiveTab('all')}
                 className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                   activeTab === 'all' 
                   ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2' 
                   : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                 }`}
               >
                 全部案例
               </button>
               {industries.map(ind => (
                 <button 
                   key={ind.id}
                   onClick={() => setActiveTab(ind.id)}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                     activeTab === ind.id 
                     ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2' 
                     : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                   }`}
                 >
                   {ind.icon}
                   {ind.name}
                 </button>
               ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredCases.map((item) => (
                 <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer" onClick={() => setSelectedCase(item)}>
                    <div className="p-8 flex-1 flex flex-col">
                       {/* Header */}
                       <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                             {item.logo}
                          </div>
                          <div>
                             <h3 className="font-bold text-slate-900 leading-tight">{item.company}</h3>
                             <p className="text-xs text-slate-500 font-medium mt-0.5">{item.industry}</p>
                          </div>
                       </div>
                       
                       {/* Title */}
                       <h4 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                         {item.title}
                       </h4>

                       {/* Challenge & Solution */}
                       <div className="space-y-4 mb-6 flex-1">
                          <div>
                             <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 block">痛点</span>
                             <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                               {item.challenge}
                             </p>
                          </div>
                          <div>
                             <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1 block">方案</span>
                             <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                               {item.solution}
                             </p>
                          </div>
                       </div>

                       {/* Metrics */}
                       <div className="bg-slate-50 rounded-xl p-4 mb-4">
                          <div className="space-y-2">
                             {item.results.map((res, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                   <CheckCircle2 size={14} className="text-blue-600 mt-0.5 shrink-0" />
                                   <span className="font-medium">{res}</span>
                                </div>
                             ))}
                          </div>
                       </div>

                       {/* Tags */}
                       <div className="flex flex-wrap gap-2 mt-auto">
                          {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2 py-1 bg-white border border-slate-200 rounded text-slate-500 uppercase tracking-wide">
                              {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    {/* Footer Link */}
                    <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                       <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700">阅读完整案例</span>
                       <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
       </section>

       {/* 5. Testimonials */}
       <section className="bg-slate-900 py-24 relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">客户评价</h2>
                <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                  真实的反馈，来自一线管理者的声音
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                   <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col h-full">
                      <Quote className="text-blue-400 mb-6 opacity-50" size={32} />
                      <p className="text-lg text-slate-200 italic mb-8 leading-relaxed flex-1">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                            {t.avatar}
                         </div>
                         <div>
                            <div className="text-white font-bold">{t.author}</div>
                            <div className="text-sm text-blue-300">{t.role}</div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </section>

       {/* 6. CTA */}
       <section className="py-24 bg-white">
         <div className="max-w-4xl mx-auto px-4 text-center">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">您的企业也可以如此高效</h2>
                   <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                      加入数千家领先企业的行列，体验企企云服务带来的管理变革。我们可以为您安排专属的行业顾问进行演示。
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button size="lg" variant="inverse" className="px-8 h-14 font-bold" onClick={onStart}>
                         开启免费试用
                      </Button>
                      <Button size="lg" variant="glass" className="px-8 h-14 font-medium" onClick={onSchedule}>
                         预约专家演示
                      </Button>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* Detail Modal */}
       {selectedCase && (
          <CaseDetailModal 
             c={selectedCase} 
             onClose={() => setSelectedCase(null)} 
             onSchedule={() => {
                setSelectedCase(null);
                onSchedule();
             }}
          />
       )}
    </div>
  );
};