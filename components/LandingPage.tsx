import React from 'react';
import { Hero } from './Hero';
import { PricingSection } from './PricingSection';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <main>
      <Hero onStart={onStart} />
      
      {/* Features Grid Summary */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why QiQi Cloud?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              重新定义企业管理
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '智能财务', desc: '深度集成的智能财务模块，打破数据孤岛，让决策更科学。' },
                { title: '项目管理', desc: '从立项到交付的全生命周期管理，精准把控进度与成本。' },
                { title: '费控报销', desc: '移动端报销，发票自动识别验真，合规高效。' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <PricingSection />
      
      {/* CTA Section */}
      <section className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">准备好开始了吗？</span>
            <span className="block text-blue-200">立即注册，开启数字化转型之旅。</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button onClick={onStart} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                免费开始
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};