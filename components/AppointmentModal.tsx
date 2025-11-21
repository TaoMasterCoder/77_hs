import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; company: string; phone: string; email: string }) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    // Reset after delay
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', company: '', phone: '', email: '' });
        onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 transition-colors">
          <X size={24} />
        </button>

        {submitted ? (
          <div className="p-12 flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">提交成功</h3>
            <p className="text-slate-500">我们的专家顾问将会在 24 小时内与您联系。</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">预约专家演示</h3>
              <p className="text-slate-500 text-sm mt-1">请留下您的联系方式，我们将为您定制演示方案。</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">姓名 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">企业名称 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="请输入企业名称"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">手机号码 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="请输入手机号码"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">工作邮箱</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="请输入工作邮箱 (选填)"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full mt-2" size="lg">
                立即预约
              </Button>
              <p className="text-xs text-slate-400 text-center mt-4">
                提交即代表您同意我们的隐私政策，您的信息将被严格保密。
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};