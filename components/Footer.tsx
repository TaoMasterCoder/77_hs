import React from 'react';
import { Cloud, Shield, Award, Phone, Mail, MapPin } from 'lucide-react';
import { PageType } from './Navbar';

// Inline SVG components for brand icons (removed from lucide-react v0.400+)
const Linkedin = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const Twitter = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Facebook = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
           
           {/* Col 1: Brand & Social */}
           <div className="col-span-2 lg:col-span-1 pr-8">
              <div className="flex items-center gap-2 text-white mb-6">
                 <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Cloud className="text-white" size={24} fill="currentColor" />
                 </div>
                 <div>
                    <span className="text-2xl font-bold tracking-tight block leading-none">企企云</span>
                    <span className="text-[10px] text-slate-400 tracking-widest uppercase">QiQi Cloud</span>
                 </div>
              </div>
              <div className="flex gap-3 mb-6">
                 <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all duration-300 text-slate-400">
                    <Linkedin size={18} />
                 </a>
                 <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 text-slate-400">
                    <Twitter size={18} />
                 </a>
                 <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#4267B2] hover:text-white transition-all duration-300 text-slate-400">
                    <Facebook size={18} />
                 </a>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                 企企云服务致力于为现代企业提供全场景、智能化的管理解决方案，助力企业实现数字化转型与商业创新。
              </p>
           </div>

           {/* Col 2: Product */}
           <div>
              <h4 className="text-white font-bold mb-6 text-lg">产品体系</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                 <li><button onClick={() => onNavigate && onNavigate('features')} className="hover:text-blue-400 transition-colors">战略决策平台</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('features')} className="hover:text-blue-400 transition-colors">客户管理平台 (CRM)</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('features')} className="hover:text-blue-400 transition-colors">项目管理平台 (PPM)</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('features')} className="hover:text-blue-400 transition-colors">运营管理平台 (ERP)</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('features')} className="hover:text-blue-400 transition-colors">智元 AI 平台</button></li>
              </ul>
           </div>

           {/* Col 3: Solutions */}
           <div>
              <h4 className="text-white font-bold mb-6 text-lg">行业与方案</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">工程技术服务行业</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">软件与信息技术服务</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">广告传媒行业</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">专业咨询服务</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">医药研发企业</button></li>
                 <li><button onClick={() => onNavigate && onNavigate('cases')} className="hover:text-blue-400 transition-colors">系统集成行业</button></li>
              </ul>
           </div>

           {/* Col 4: Resources */}
           <div>
              <h4 className="text-white font-bold mb-6 text-lg">关于企业</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                 <li><button onClick={() => onNavigate && onNavigate('about')} className="hover:text-blue-400 transition-colors text-left">关于企企</button></li>
                 <li><a href="#" className="hover:text-blue-400 transition-colors">新闻动态</a></li>
                 <li><a href="#" className="hover:text-blue-400 transition-colors">加入我们</a></li>
                 <li><a href="#" className="hover:text-blue-400 transition-colors">联系我们</a></li>
                 <li><a href="#" className="hover:text-blue-400 transition-colors">隐私政策</a></li>
              </ul>
           </div>

           {/* Col 5: Contact */}
           <div>
              <h4 className="text-white font-bold mb-6 text-lg">联系我们</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                 <li className="flex items-start gap-3 group">
                    <Phone size={18} className="mt-0.5 shrink-0 text-blue-500 group-hover:text-white transition-colors" />
                    <div>
                       <span className="block text-xs text-slate-500 mb-0.5">服务热线</span>
                       <span className="text-white font-medium">400-028-2077</span>
                    </div>
                 </li>
                 <li className="flex items-start gap-3 group">
                    <Mail size={18} className="mt-0.5 shrink-0 text-blue-500 group-hover:text-white transition-colors" />
                    <div>
                       <span className="block text-xs text-slate-500 mb-0.5">电子邮箱</span>
                       <span className="hover:text-white transition-colors">contact@qiqi-cloud.com</span>
                    </div>
                 </li>
                 <li className="flex items-start gap-3 group">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-blue-500 group-hover:text-white transition-colors" />
                    <div>
                       <span className="block text-xs text-slate-500 mb-0.5">公司地址</span>
                       <span>北京市海淀区中关村软件园<br/>7号楼国际大厦15层</span>
                    </div>
                 </li>
              </ul>
           </div>
        </div>

        {/* Friendly Links */}
        <div className="border-t border-slate-800 pt-6 pb-8">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
               <span className="text-slate-400 font-bold">友情链接：</span>
               <a href="#" className="hover:text-blue-400 transition-colors">项目管理软件</a>
               <a href="#" className="hover:text-blue-400 transition-colors">企业管理培训</a>
               <a href="#" className="hover:text-blue-400 transition-colors">SaaS点评网</a>
               <a href="#" className="hover:text-blue-400 transition-colors">智能客服平台</a>
               <a href="#" className="hover:text-blue-400 transition-colors">低代码开发平台</a>
               <a href="#" className="hover:text-blue-400 transition-colors">专业服务自动化 (PSA)</a>
               <a href="#" className="hover:text-blue-400 transition-colors">企业数字化转型指南</a>
            </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-slate-800 pt-10 pb-10">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              <div className="flex flex-col items-center gap-3 group cursor-default">
                 <Shield className="text-slate-600 group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1.5} />
                 <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">ISO9001<br/>质量体系认证</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-default">
                 <Shield className="text-slate-600 group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1.5} />
                 <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">ISO27001<br/>信息安全体系认证</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-default">
                 <Award className="text-slate-600 group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1.5} />
                 <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">国家信息安全<br/>等级保护三级认证</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-default">
                 <Award className="text-slate-600 group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1.5} />
                 <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">国家<br/>高新技术企业</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-default">
                 <Cloud className="text-slate-600 group-hover:text-white transition-colors duration-300" size={40} strokeWidth={1.5} />
                 <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">亚马逊云科技<br/>技术合作伙伴</span>
              </div>
           </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
           <p className="mb-4 md:mb-0">Copyright &copy; 2024 QiQi Cloud Services. All Rights Reserved. 北京企企云科技有限公司</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">京ICP备18042175号-2</a>
              <a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                 <Shield size={10} />
                 京公网安备 11010802035519号
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-slate-300 transition-colors">服务条款</a>
           </div>
        </div>

      </div>
    </footer>
  );
};