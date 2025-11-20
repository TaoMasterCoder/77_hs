import React from 'react';
import { Cloud } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-col md:flex-row">
          <div className="flex items-center mb-4 md:mb-0">
            <Cloud className="text-blue-600 mr-2" size={24} />
            <span className="text-xl font-bold text-slate-900">企企云服务</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; 2024 QiQi Cloud Services. All rights reserved. 模仿珠峰软件风格设计.
          </p>
        </div>
      </div>
    </footer>
  );
};