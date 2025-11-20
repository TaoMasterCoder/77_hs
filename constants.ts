import { PlanType, PricingTier, ResourcePricing } from './types';

export const EXCHANGE_RATE_USD_TO_CNY = 7.2;

export const PRICING_TIERS: Record<PlanType, PricingTier> = {
  [PlanType.STANDARD]: {
    id: PlanType.STANDARD,
    name: '标准版',
    pricePerUserYear: 360,
    minUsers: 1,
    maxUsers: 99,
    description: '适合百人以下的中小规模团队，快速部署，灵活高效。',
    features: [
      '全模块ERP功能访问',
      '标准财务报表',
      '移动端全功能支持',
      '7x12小时在线客服',
      '基础数据备份'
    ]
  },
  [PlanType.PROFESSIONAL]: {
    id: PlanType.PROFESSIONAL,
    name: '专业版',
    pricePerUserYear: 720,
    minUsers: 100,
    maxUsers: null,
    description: '专为百人以上规模企业打造，深度定制与高性能并发支持。',
    features: [
      '包含标准版所有功能',
      '多账套/多组织架构支持',
      'AI 智能分析助手',
      'OpenAPI 接口开放',
      '专属客户经理 & 实施顾问',
      '私有化部署选项'
    ]
  }
};

export const RESOURCE_PRICING: ResourcePricing = {
  storagePerGBMonth: 5, // 5 RMB per GB per month
  tokensPerMillion: 20, // 20 RMB per 1M tokens
};