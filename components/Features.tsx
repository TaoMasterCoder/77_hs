import React, { useState } from 'react';
import { 
  PieChart, 
  Briefcase, 
  Receipt, 
  Smartphone, 
  FileCheck, 
  Target, 
  BarChart3, 
  Users
} from 'lucide-react';
import { Button } from './Button';

interface FeatureBlockProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  points: string[];
  isReversed?: boolean;
  colorClass: string;
  imageSrc: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, icon, points, isReversed, colorClass, imageSrc }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 py-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
      <div className="flex-1">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClass}`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-lg text-slate-500 mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-center gap-3 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 relative overflow-hidden aspect-video flex items-center justify-center group cursor-pointer">
           <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
           <img 
              src={imageSrc} 
              alt={title}
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
           />
           {/* Subtle overlay to ensure image doesn't clash too much with bright backgrounds */}
           <div className="absolute inset-0 bg-black/5 z-20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
      </div>
    </div>
  );
};

const RoleBenefitSection = () => {
   const [activeRole, setActiveRole] = useState('cfo');
   
   const roles = [
     { id: 'boss', label: '企业管理者', icon: <Target size={20} /> },
     { id: 'cfo', label: '财务总监', icon: <BarChart3 size={20} /> },
     { id: 'pm', label: '项目经理', icon: <Briefcase size={20} /> },
     { id: 'staff', label: '普通员工', icon: <Users size={20} /> },
   ];

   const content = {
     boss: {
       title: "经营状况，一手掌握",
       desc: "不再依赖滞后的月度报表。通过移动端驾驶舱，实时查看项目利润、现金流与人效分析，让决策基于实时数据。",
       items: ["企业经营看板", "项目盈亏实时测算", "现金流预测", "核心人才盘点"]
     },
     cfo: {
       title: "业财融合，合规高效",
       desc: "告别事后核算与繁琐对账。业务单据自动生成凭证，预算前置控制风险，释放财务人员精力专注于经营分析。",
       items: ["自动凭证引擎", "多账套/多准则核算", "全流程预算控制", "自动化报表"]
     },
     pm: {
       title: "项目全貌，透视管理",
       desc: "从商机到回款的全链路闭环。精准把控项目进度、成本与质量，合理调配资源，提升交付满意度。",
       items: ["项目全生命周期", "资源负荷分析", "工时成本核算", "外包/采购管理"]
     },
     staff: {
       title: "简单易用，专注工作",
       desc: "极致的用户体验。无论是报销、请假还是工时填报，都能在手机端快速完成，减少行政事务占用。",
       items: ["智能语音报销", "移动考勤/审批", "一站式工作台", "自助查询工资条"]
     }
   };
   
   // @ts-ignore
   const activeContent = content[activeRole];

   return (
      <div className="bg-slate-50 py-20 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900">赋能每一个关键角色</h2>
               <p className="mt-4 text-lg text-slate-500">不同视角的价值呈现，共同驱动组织高效运转</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
               {/* Sidebar tabs */}
               <div className="w-full md:w-1/4 bg-slate-50 border-r border-slate-100">
                  {roles.map(role => (
                     <button
                        key={role.id}
                        onClick={() => setActiveRole(role.id)}
                        className={`w-full text-left px-6 py-5 flex items-center gap-3 transition-all border-l-4 outline-none ${
                           activeRole === role.id 
                           ? 'bg-white text-blue-600 border-blue-600 shadow-sm' 
                           : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                        }`}
                     >
                        {role.icon}
                        <span className="font-medium">{role.label}</span>
                     </button>
                  ))}
               </div>
               
               {/* Content area */}
               <div className="flex-1 p-8 md:p-12">
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={activeRole}>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{activeContent.title}</h3>
                     <p className="text-slate-600 mb-8 text-lg leading-relaxed">{activeContent.desc}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeContent.items.map((item: string, idx: number) => (
                           <div key={idx} className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-50">
                              <FileCheck className="text-blue-500" size={18} />
                              <span className="text-slate-700 font-medium">{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export const Features: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-slate-900 text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            全场景业务赋能，<span className="text-blue-400">重构企业核心竞争力</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            从项目管理到智能财务，企企云服务为您提供一站式企业数字化解决方案，让数据成为驱动增长的新引擎。
          </p>
          <Button size="lg" onClick={onStart}>免费体验完整功能</Button>
        </div>
      </div>

      {/* Features List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl p-8 mb-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
            <div className="p-4">
               <p className="text-4xl font-bold text-blue-600 mb-2">100%</p>
               <p className="text-slate-600 font-medium">业财数据实时同步</p>
            </div>
            <div className="p-4">
               <p className="text-4xl font-bold text-blue-600 mb-2">50%+</p>
               <p className="text-slate-600 font-medium">提升项目交付效率</p>
            </div>
            <div className="p-4">
               <p className="text-4xl font-bold text-blue-600 mb-2">0</p>
               <p className="text-slate-600 font-medium">硬件维护成本</p>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FeatureBlock 
          title="项目全生命周期管理"
          description="打破部门壁垒，实现从商机、立项、计划、执行到结项的全过程精细化管理。实时掌控项目进度与成本，提升交付质量。"
          icon={<Briefcase size={32} />}
          colorClass="bg-blue-100 text-blue-600"
          points={[
            "可视化项目看板，任务进度一目了然",
            "精细化资源调度，工时填报与成本核算",
            "移动端现场管理，随时随地协同办公",
            "项目利润实时测算，风险自动预警"
          ]}
          imageSrc="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        />

        <FeatureBlock 
          title="业财一体化智能财务"
          description="业务单据自动生成凭证，告别繁琐的手工录入。多维度财务报表实时出具，让财务从核算转型为业务合作伙伴。"
          icon={<PieChart size={32} />}
          colorClass="bg-purple-100 text-purple-600"
          isReversed
          points={[
            "智能凭证引擎，业务数据自动转化",
            "多准则/多币种/多账套支持",
            "银企直联，资金流水自动对账",
            "实时利润表/资产负债表，决策快人一步"
          ]}
          imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        />

        <FeatureBlock 
          title="智能费控与报销"
          description="全流程数字化费控，OCR智能票据识别，发票自动验真查重。预算控制前置，合规高效，员工免贴票，财务免核对。"
          icon={<Receipt size={32} />}
          colorClass="bg-green-100 text-green-600"
          points={[
            "OCR 拍照识别，发票一键上传",
            "预算事前管控，超支自动预警冻结",
            "信用支付集成，对公支付一键直达",
            "差旅预订平台对接，无需垫资"
          ]}
          imageSrc="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        />

        <FeatureBlock 
          title="PaaS 平台与移动办公"
          description="基于云原生架构，支持低代码个性化配置。原生移动App支持，无论身在何处，业务审批、数据查询触手可及。"
          icon={<Smartphone size={32} />}
          colorClass="bg-orange-100 text-orange-600"
          isReversed
          points={[
            "自定义表单与审批流，适应多变业务",
            "OpenAPI 开放平台，连接第三方系统",
            "企业级安全防护，数据加密存储",
            "全功能移动端 App，不仅仅是审批"
          ]}
          imageSrc="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        />
      </div>
      
      <RoleBenefitSection />

      {/* Bottom CTA */}
      <div className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">不仅是工具，更是先进的管理思想</h2>
          <p className="text-slate-500 mb-8 text-lg">
            加入超过 5,000 家领先企业的行列，体验企企云服务带来的管理变革。
          </p>
          <Button size="lg" onClick={onStart}>立即预约演示</Button>
        </div>
      </div>
    </div>
  );
};
