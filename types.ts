export enum PlanType {
  STANDARD = 'STANDARD', // < 100 users
  PROFESSIONAL = 'PROFESSIONAL' // >= 100 users
}

export type Currency = 'CNY' | 'USD';

export interface PricingTier {
  id: PlanType;
  name: string;
  pricePerUserYear: number; // Base price in CNY
  minUsers: number;
  maxUsers: number | null; // null means infinity
  features: string[];
  description: string;
}

export type TransactionType = 'recharge' | 'subscription' | 'resource';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // Amount in original currency
  currency: Currency; // The currency of this transaction
  exchangeRate: number; // Rate used at time of transaction (to Base Currency CNY)
  baseAmount: number; // Converted amount in CNY
  description: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
}

export interface UserState {
  balance: number; // Always stored in CNY (Base Currency)
  displayCurrency: Currency;
  isSubscribed: boolean;
  activePlan: PlanType | null;
  userCount: number;
  storageGB: number;
  tokensUsed: number;
  expiryDate: string | null;
  transactions: Transaction[];
}

export interface ResourcePricing {
  storagePerGBMonth: number;
  tokensPerMillion: number;
}