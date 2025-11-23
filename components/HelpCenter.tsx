import React, { useState } from 'react';
import { MessageCircle, FileText, Phone, Mail, Search, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from './Button';

// Mock Data for FAQs/Articles
const HELP_ARTICLES = [
  { id: '1', title: '如何充值账户余额？', category: '资金管理', content: '进入控制台首页或点击左侧导航栏的"总览"，在账户余额卡片中点击"立即充值"。支持支付宝、微信支付和PayPal。充值金额实时到账。' },
  { id: '2', title: '标准版和专业版有什么区别？', category: '订阅服务', content: '标准版适合100人以下团队，包含全模块ERP功能。专业版适合100人以上企业，额外提供AI智能分析助手、OpenAPI接口开放、多账套支持及专属客户经理服务。' },
  { id: '3', title: '如何开具发票？', category: '资金管理', content: '在"交易记录"页面，点击右上角的"导出账单"或"申请发票"。我们支持增值税电子普通发票和增值税专用发票。电子发票通常在申请后 10 分钟内发送至您的邮箱。' },
  { id: '4', title: '忘记密码怎么办？', category: '账号安全', content: '在登录页面点击"忘记密码"，通过注册手机号或邮箱接收验证码重置密码。如无法接收验证码，请联系人工客服进行身份核验。' },
  { id: '5', title: '如何购买额外的存储空间？', category: '资源管理', content: '在"资源用量"页面，您可以查看当前存储使用情况。点击"购买扩容包"即可增加存储空间（每包10GB），费用将直接从账户余额中扣除，即时生效。' },
  { id: '6', title: 'AI Token 是什么？如何计费？', category: '资源管理', content: 'AI Token 是使用智能助手进行数据分析时的计量单位。每次对话或生成报表会消耗一定数量的 Token。我们按量计费，您也可以购买流量包享受优惠费率。' },
  { id: '7', title: '系统支持私有化部署吗？', category: '技术支持', content: '支持。专业版及以上用户可申请私有化部署服务，数据部署在客户自己的服务器上。请联系您的客户经理或拨打400电话咨询具体方案。' },
  { id: '8', title: '如何添加新员工账号？', category: '系统设置', content: '管理员进入"设置" -> "组织架构" -> "成员管理"，点击"添加成员"或"批量导入"。系统会向员工发送邀请链接，员工点击链接即可完成激活。' },
  { id: '9', title: '数据安全如何保障？', category: '安全隐私', content: '我们采用银行级数据加密技术（AES-256），所有数据传输均经过 SSL 加密。数据每日自动异地备份，且通过了 ISO27001 信息安全体系认证。' },
];

export const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredArticles = HELP_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">帮助中心</h2>
        <div className="relative w-full md:w-96">
            <input 
                type="text" 
                placeholder="搜索问题、功能指南..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            {searchQuery && (
               <button 
                 onClick={() => setSearchQuery('')}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
               >
                 清除
               </button>
            )}
        </div>
      </div>
      
      {/* Quick Access Cards - Hidden when searching to reduce clutter */}
      {!searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">产品文档</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              浏览详细的功能操作指南、视频教程以及常见问题解答，快速上手企企云服务。
            </p>
            <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200">
              查看文档 
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
            </Button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">在线支持</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              遇到技术问题？我们的技术支持团队 7x12 小时在线，为您提供实时协助。
            </p>
            <Button variant="outline" className="w-full group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-200">联系客服</Button>
          </div>
        </div>
      )}

      {/* FAQ List / Search Results */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle size={20} className="text-blue-600" />
                {searchQuery ? `搜索结果 (${filteredArticles.length})` : '常见问题 (FAQ)'}
            </h3>
        </div>
        
        {filteredArticles.length > 0 ? (
            <div className="divide-y divide-slate-100">
                {filteredArticles.map(article => (
                    <div key={article.id} className="bg-white group">
                        <button 
                            onClick={() => toggleExpand(article.id)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors outline-none"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide whitespace-nowrap ${
                                  article.category === '资金管理' ? 'bg-green-100 text-green-700' :
                                  article.category === '资源管理' ? 'bg-purple-100 text-purple-700' :
                                  article.category === '订阅服务' ? 'bg-blue-100 text-blue-700' :
                                  'bg-slate-100 text-slate-600'
                                }`}>{article.category}</span>
                                <span className={`font-medium text-slate-900 group-hover:text-blue-600 transition-colors ${expandedId === article.id ? 'text-blue-600' : ''}`}>{article.title}</span>
                            </div>
                            <div className={`transition-transform duration-200 ${expandedId === article.id ? 'rotate-180' : ''}`}>
                               <ChevronDown size={18} className="text-slate-400" />
                            </div>
                        </button>
                        {expandedId === article.id && (
                            <div className="px-6 pb-6 pt-0 pl-[5.5rem] animate-in fade-in slide-in-from-top-1 duration-200">
                                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-lg border border-slate-100 shadow-sm">
                                    {article.content}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="text-slate-300" size={32} />
                </div>
                <h4 className="text-slate-900 font-medium mb-1">未找到相关内容</h4>
                <p className="text-slate-500 text-sm mb-4">您可以尝试更换关键词，或者联系人工客服。</p>
                <button onClick={() => setSearchQuery('')} className="text-blue-600 text-sm font-bold hover:underline">清除搜索条件</button>
            </div>
        )}
      </div>

      {/* Contact Info Footer */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
            <Phone size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-900">客服热线</p>
            <p className="text-slate-500 text-sm">400-028-2077 (工作日 9:00-18:00)</p>
          </div>
        </div>
         <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
            <Mail size={20} />
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