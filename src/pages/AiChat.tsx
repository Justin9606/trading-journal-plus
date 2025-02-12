import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, Sparkles, Bot, RefreshCw, Download, X, ChevronDown, Search, Image } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  image?: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI trading assistant. I can help analyze your trades, provide market insights, and improve your trading strategy. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Trading Strategy Analysis',
      lastMessage: 'Let\'s analyze your recent trades...',
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Risk Management Review',
      lastMessage: 'Your current risk metrics show...',
      timestamp: new Date(Date.now() - 86400000),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !fileInputRef.current?.files?.length) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      status: 'sending',
    };

    // Handle file upload
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        userMessage.image = e.target?.result as string;
        setMessages(prev => [...prev, userMessage]);
        simulateResponse(userMessage.content, true);
      };
      reader.readAsDataURL(file);
      fileInputRef.current.value = '';
    } else {
      setMessages(prev => [...prev, userMessage]);
      simulateResponse(userMessage.content, false);
    }

    setInput('');
  };

  const simulateResponse = (userInput: string, isImageAnalysis: boolean) => {
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isImageAnalysis ? generateImageAnalysis() : generateAIResponse(userInput),
        timestamp: new Date(),
        status: 'sent',
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateImageAnalysis = (): string => {
    const analyses = [
      'Looking at this chart, I notice a clear bullish trend with strong support levels. The price action shows consistent higher highs and higher lows, suggesting momentum is likely to continue.',
      'This technical pattern appears to be a head and shoulders formation. The neckline is clearly visible, and volume patterns support the potential for a trend reversal.',
      'The chart shows significant resistance at key Fibonacci levels. Consider waiting for a clear breakout confirmation before entering a position.',
      'I can see multiple bullish candlestick patterns forming near the support level. This, combined with increasing volume, suggests a potential reversal point.',
    ];
    return analyses[Math.floor(Math.random() * analyses.length)];
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'Based on your recent trading patterns, I notice your win rate is higher during morning sessions. Consider focusing more on these hours and reducing afternoon trades where your performance shows more volatility.',
      'Looking at your portfolio metrics, there\'s an opportunity to improve risk management. Your current risk-reward ratio averages 1:1.5, but you could aim for 1:2 or higher by adjusting your take-profit levels.',
      'I\'ve analyzed your trading history, and it shows a strong correlation between market volatility and your performance. You might want to adjust your position sizing during high-volatility periods.',
      'Your most successful trades have been in the technology sector during earnings seasons. Consider developing a specialized strategy around these events while maintaining proper risk management.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Hi! I\'m your AI trading assistant. How can I help you today?',
      timestamp: new Date(),
    }]);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 border-r border-gray-800 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-800">
            <button
              onClick={startNewChat}
              className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>New Chat</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full p-3 hover:bg-gray-800 rounded-lg mb-1 text-left transition-colors"
                >
                  <p className="font-medium truncate">{conversation.title}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {conversation.timestamp.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Brain className="h-6 w-6 text-primary-400" />
              </button>
              <h1 className="text-xl font-bold">AI Trading Assistant</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] flex space-x-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary-500'
                        : 'bg-gray-800'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <Bot className="h-5 w-5" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </div>

                  {/* Message */}
                  <div
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary-500'
                        : 'bg-gray-800'
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Trading Chart"
                        className="max-w-full rounded-lg mb-2"
                      />
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.status === 'error' && (
                        <span className="text-xs text-red-400">Failed to send</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] flex space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your trading performance..."
                className="w-full bg-gray-800 rounded-lg pl-4 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                />
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Image className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || (!input.trim() && !fileInputRef.current?.files?.length)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}