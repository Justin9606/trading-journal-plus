import { useState } from 'react';
import { Brain, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatAssistantProps {
  onClose: () => void;
}

export function AiChatAssistant({ onClose }: AiChatAssistantProps) {
  const [aiMessage, setAiMessage] = useState('');
  const [aiHistory, setAiHistory] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I can help analyze your trading performance. What would you like to know?' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    setAiHistory([...aiHistory, { role: 'user', content: aiMessage }]);
    
    setTimeout(() => {
      setAiHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Based on your recent trading patterns, I notice your win rate is higher during morning sessions. Consider focusing more on these hours and reducing afternoon trades where your performance shows more volatility.'
      }]);
    }, 1000);

    setAiMessage('');
  };

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-gray-900 rounded-xl shadow-xl border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary-400" />
          <h3 className="font-semibold text-white">AI Trading Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {aiHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary-500'
                  : 'bg-gray-800'
              }`}
            >
              <p className="text-sm text-white">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            placeholder="Ask about your trading performance..."
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}