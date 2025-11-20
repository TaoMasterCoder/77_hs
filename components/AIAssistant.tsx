import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Send, X, Sparkles, Bot, Loader2 } from 'lucide-react';
import { UserState, Transaction } from '../types';
import { Button } from './Button';

interface AIAssistantProps {
  userState: UserState;
  onAddTransaction: (amount: number, description: string, type: Transaction['type']) => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ userState, onAddTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是企企智能助手。您可以让我帮您记账（如"充值1000元"、"购买服务器花费500元"），或者询问当前的财务状况。' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to access the latest state inside async API callbacks
  const userStateRef = useRef(userState);
  useEffect(() => {
    userStateRef.current = userState;
  }, [userState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isThinking]);

  // --- Tool Definitions ---

  const addTransactionTool = {
    name: 'addTransaction',
    description: 'Record a new financial transaction. Execute this whenever the user wants to add income, expenses, buy resources, or recharge.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        amount: {
          type: Type.NUMBER,
          description: 'The transaction amount in CNY. IMPORTANT: Use POSITIVE numbers for income/recharges. Use NEGATIVE numbers for expenses, costs, purchases, or deductions (e.g., if user says "spent 100", amount is -100).',
        },
        description: {
          type: Type.STRING,
          description: 'A brief description of the transaction (e.g., "Recharge", "Server cost", "Office supplies").',
        },
        type: {
          type: Type.STRING,
          enum: ['recharge', 'subscription', 'resource'],
          description: 'The category. "recharge" for adding funds. "subscription" for plan upgrades. "resource" for purchasing tokens/storage or general expenses.',
        },
      },
      required: ['amount', 'description', 'type'],
    },
  };

  const getFinancialDataTool = {
    name: 'getFinancialData',
    description: 'Get current financial status (balance, recent transactions, subscription). Use this to answer questions about the user\'s account.',
    parameters: {
      type: Type.OBJECT,
      properties: {}, 
    },
  };

  // --- API Interaction ---

  const handleSend = async () => {
    if (!input.trim()) return;

    // Safe access to API Key
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'model', text: 'Configuration Error: API_KEY is missing.' }]);
      return;
    }

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are QiQi (企企), the intelligent AI assistant for the QiQi Cloud ERP system.
          Your persona is professional, efficient, and friendly.
          
          Your capabilities:
          1. Record financial transactions (Income/Expenses) using 'addTransaction'.
          2. Check financial status using 'getFinancialData'.

          Rules for 'addTransaction':
          - If the user says "I spent 100", "Cost 200", "Buy storage for 50", the amount MUST be NEGATIVE (e.g., -100).
          - If the user says "Recharge 100", "Income 500", the amount MUST be POSITIVE.
          - Infer the 'type' based on context if not specified.
          - AFTER executing the tool, you MUST confirm the action to the user (e.g., "Success! I have recorded a recharge of ¥100.").

          General Rules:
          - Be concise.
          - If the user asks about data you don't have, check 'getFinancialData' first.
          - Use the user's language (Simplified Chinese).
          `,
          tools: [{ functionDeclarations: [addTransactionTool, getFinancialDataTool] }],
        }
      });

      // Send the user message and await response (potentially with function calls)
      let result = await chatSession.sendMessage({ message: userText });

      // Loop to handle function calls if the model requests them
      while (result.functionCalls && result.functionCalls.length > 0) {
         const functionResponses: any[] = [];

         for (const call of result.functionCalls) {
            let functionResult;
            const args = call.args as any;
            
            if (call.name === 'addTransaction') {
               // Execute Local Function
               onAddTransaction(args.amount, args.description, args.type);
               
               functionResult = { 
                 status: 'success', 
                 message: `Transaction recorded successfully. Type: ${args.type}, Amount: ${args.amount}, Desc: ${args.description}` 
               };
            } 
            
            if (call.name === 'getFinancialData') {
               const state = userStateRef.current;
               functionResult = {
                  balance: state.balance,
                  currency: state.displayCurrency,
                  isSubscribed: state.isSubscribed,
                  storageUsed: state.storageGB,
                  recentTransactions: state.transactions.slice(0, 5).map(t => ({
                     date: t.date,
                     desc: t.description,
                     amount: t.baseAmount,
                     type: t.type
                  }))
               };
            }

            functionResponses.push({
               functionResponse: {
                  id: call.id,
                  name: call.name,
                  response: { result: functionResult }
               }
            });
         }

         // Send the execution results back to the model to generate the final text
         // We pass the array of function responses as the message parts
         result = await chatSession.sendMessage({ message: functionResponses });
      }

      // Display the model's final natural language response
      const modelText = result.text;
      if (modelText) {
        setMessages(prev => [...prev, { role: 'model', text: modelText }]);
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，系统遇到了一些问题，请稍后再试。' }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white w-[340px] md:w-[380px] h-[550px] rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200 transition-all duration-300 ${isThinking ? 'shadow-blue-300/50 ring-2 ring-blue-400 border-transparent' : 'shadow-2xl border border-slate-200 ring-1 ring-slate-900/5'}`}>
          {/* Header */}
          <div className={`p-4 flex justify-between items-center text-white shadow-md z-10 transition-all duration-500 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600`}>
            {/* Subtle gradient animation overlay */}
            {isThinking && (
               <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            )}
            
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <Sparkles size={18} className={`text-yellow-300 fill-yellow-300 ${isThinking ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">企企智能助手</h3>
                <p className="text-[10px] text-blue-100 opacity-90 flex items-center gap-1">
                  {isThinking ? (
                    <>
                      <Loader2 size={8} className="animate-spin" />
                      <span>正在处理业务请求...</span>
                    </>
                  ) : (
                     'AI 驱动 · 实时响应'
                  )}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 p-1.5 rounded-lg transition-colors relative z-10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Enhanced Thinking Indicator */}
            {isThinking && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white border border-blue-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-3">
                   <div className="flex space-x-1 h-2 items-center">
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                   </div>
                   <span className="text-xs text-slate-400 font-medium animate-pulse">QiQi 正在思考中...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 bg-white border-t transition-colors duration-300 ${isThinking ? 'border-blue-100 bg-blue-50/30' : 'border-slate-100'}`}>
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={isThinking ? "请稍候..." : "记一笔 500元的服务器费用..."}
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isThinking}
              />
              <Button 
                size="sm" 
                className={`absolute right-1.5 w-9 h-9 rounded-lg p-0 flex items-center justify-center transition-all ${input.trim() ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen 
          ? 'bg-slate-700 text-white rotate-90 scale-90' 
          : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:scale-110 hover:shadow-blue-600/40 animate-bounce'
        }`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
};