import React from 'react';
import { Target, Lightbulb, Users, Award, MapPin, Briefcase, Rocket, Heart, Cloud } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            科技赋能服务业
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            致力于为现代企业打造"数字大脑"，重构商业连接，让管理更简单，让数据更有价值。
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-slate-900 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg shrink-0">
                  <Cloud size={24} fill="currentColor" />
                </span>
                关于企企云
              </h2>
              <p className="mt-6 text-slate-500 font-medium text-lg">
                下一代企业核心系统开创者
              </p>
            </div>
            <div className="md:w-2/3 space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                北京企企云科技有限公司（简称"企企"）成立于2018年，由前用友高级副总裁、SAP中国区高管及顶尖互联网技术专家联合创立。我们深耕企业级SaaS领域，依托先进的云原生架构与人工智能技术，为专业服务业提供一体化的管理云平台。
              </p>
              <p>
                在数字经济时代，传统的管理软件已难以满足企业敏捷多变的需求。企企云通过"平台+应用"的模式，打通项目管理、费控报销、智能财务与经营分析，消除数据孤岛，帮助企业实现从"流程驱动"到"数据驱动"的转型升级。
              </p>
              <p>
                截至目前，企企已服务超过5000家行业领军企业，覆盖工程技术、软件信息、广告传媒、专业咨询等多个领域，致力于成为最值得信赖的企业数字化合作伙伴。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">核心价值观</h2>
            <p className="mt-4 text-slate-500">我们的信仰，指引我们前行的方向</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center group">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">成就客户</h3>
              <p className="text-slate-500 text-sm">始终将客户价值放在首位，倾听声音，超越期待。</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center group">
              <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">持续创新</h3>
              <p className="text-slate-500 text-sm">拥抱变化，敢于突破，用技术推动商业进步。</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center group">
              <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">开放共赢</h3>
              <p className="text-slate-500 text-sm">与生态伙伴携手，构建互利共生的数字生态系统。</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow text-center group">
              <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">追求卓越</h3>
              <p className="text-slate-500 text-sm">不妥协，不将就，以匠心打磨极致的产品体验。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">发展历程</h2>
            <p className="mt-4 text-slate-500">一步一个脚印，见证成长的力量</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              {/* Item 1 */}
              <div className="relative flex items-center justify-between flex-col md:flex-row">
                <div className="order-1 md:w-5/12 text-center md:text-right pr-0 md:pr-10">
                  <h3 className="text-2xl font-bold text-blue-600">2018 年</h3>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">企企成立</h4>
                  <p className="text-slate-500 mt-2 text-sm">成立于北京中关村，确立了"服务业数字化"的战略方向，获得天使轮融资。</p>
                </div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full shadow-lg ring-4 ring-white my-4 md:my-0">
                  <Target size={20} className="text-white" />
                </div>
                <div className="order-3 md:w-5/12 pl-0 md:pl-10"></div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-center justify-between flex-col md:flex-row">
                <div className="order-1 md:w-5/12 text-center md:text-right pr-0 md:pr-10 md:order-1"></div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 bg-white border-4 border-blue-600 rounded-full shadow-lg ring-4 ring-white my-4 md:my-0">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="order-3 md:w-5/12 pl-0 md:pl-10 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-blue-600">2019 年</h3>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">产品 1.0 发布</h4>
                  <p className="text-slate-500 mt-2 text-sm">推出首个基于云原生的项目管理与费控一体化平台，签约首批 100 家种子客户。</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-center justify-between flex-col md:flex-row">
                <div className="order-1 md:w-5/12 text-center md:text-right pr-0 md:pr-10">
                  <h3 className="text-2xl font-bold text-blue-600">2021 年</h3>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">B 轮融资与扩张</h4>
                  <p className="text-slate-500 mt-2 text-sm">获得数千万美元 B 轮融资，在上海、深圳、成都设立分公司，团队规模突破 300 人。</p>
                </div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 bg-white border-4 border-blue-600 rounded-full shadow-lg ring-4 ring-white my-4 md:my-0">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="order-3 md:w-5/12 pl-0 md:pl-10"></div>
              </div>

              {/* Item 4 */}
              <div className="relative flex items-center justify-between flex-col md:flex-row">
                 <div className="order-1 md:w-5/12 text-center md:text-right pr-0 md:pr-10 md:order-1"></div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 bg-white border-4 border-blue-600 rounded-full shadow-lg ring-4 ring-white my-4 md:my-0">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="order-3 md:w-5/12 pl-0 md:pl-10 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-blue-600">2023 年</h3>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">AI 战略升级</h4>
                  <p className="text-slate-500 mt-2 text-sm">发布 QiQi Cloud 3.0，全面引入人工智能助手，客户数量突破 5000 家，成为行业独角兽。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Office */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-6">遍布全国的服务网络</h2>
                 <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    总部位于北京中关村软件园，在上海、深圳、成都、西安等地设有研发中心与分支机构。我们建立了一支超过 500 人的专业团队，包括 300+ 研发工程师与 100+ 行业顾问，为客户提供本地化、贴身式的实施服务。
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-blue-500 mt-1 shrink-0" />
                       <div>
                          <h4 className="font-bold">北京总部</h4>
                          <p className="text-slate-400 text-sm">北京市海淀区中关村软件园 7 号楼国际大厦 15 层</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <MapPin className="text-blue-500 mt-1 shrink-0" />
                       <div>
                          <h4 className="font-bold">上海研发中心</h4>
                          <p className="text-slate-400 text-sm">上海市浦东新区张江高科园区科苑路 88 号</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 rounded-full"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Office" 
                    className="relative z-10 rounded-2xl shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-500"
                 />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};