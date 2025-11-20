import React from 'react';
import { MessageCircle, FileText, Phone, Mail } from 'lucide-react';
import { Button } from './Button';

export const HelpCenter: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">帮助中心</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">产品文档</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            浏览详细的功能操作指南、视频教程以及常见问题解答，快速上手企企云服务。
          </p>
          <Button variant="outline" className="w-full group">
            查看文档 
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
            <MessageCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">在线支持</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            遇到技术问题？我们的技术支持团队 7x12 小时在线，为您提供实时协助。
          </p>
          <Button variant="outline" className="w-full">联系客服</Button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Phone size={20} className="text-slate-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">客服热线</p>
            <p className="text-slate-500 text-sm">400-123-4567 (工作日 9:00-18:00)</p>
          </div>
        </div>
         <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Mail size={20} className="text-slate-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">企业邮箱</p>
            <p className="text-slate-500 text-sm">support@qiqi-cloud.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};