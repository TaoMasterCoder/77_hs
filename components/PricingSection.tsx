import React from 'react';
import { PricingCalculator } from './PricingCalculator';

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">灵活定价</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            透明、可预测的成本结构
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
            拒绝隐形消费。根据企业人数自动匹配标准版或专业版，采用预充值模式，随时按需扩展存储与AI能力。
          </p>
        </div>

        <PricingCalculator />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">预充值模式</h3>
                <p className="mt-5 text-base text-slate-500">
                  企业钱包统一管理。支持大额充值，自动抵扣订阅费用和资源消耗，财务对账更简单。
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">资源弹性扩展</h3>
                <p className="mt-5 text-base text-slate-500">
                  存储空间不足？需要更多AI分析额度？在控制台一键购买资源包，即刻生效。
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">企业级安全</h3>
                <p className="mt-5 text-base text-slate-500">
                  全站 SSL 加密，每日自动备份，异地容灾。专业版支持私有化部署选项，数据完全掌控。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};