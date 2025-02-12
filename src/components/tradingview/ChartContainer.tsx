import { useState } from 'react';
import { TradingViewWidget } from './TradingViewWidget';
import { Settings, Maximize2, Minimize2 } from 'lucide-react';

interface ChartContainerProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}

export function ChartContainer({ symbol, onSymbolChange }: ChartContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [interval, setInterval] = useState('D');

  const intervals = [
    { label: '1m', value: '1' },
    { label: '5m', value: '5' },
    { label: '15m', value: '15' },
    { label: '1h', value: '60' },
    { label: '4h', value: '240' },
    { label: '1D', value: 'D' },
    { label: '1W', value: 'W' },
  ];

  const popularSymbols = [
    { label: 'AAPL', value: 'NASDAQ:AAPL' },
    { label: 'GOOGL', value: 'NASDAQ:GOOGL' },
    { label: 'MSFT', value: 'NASDAQ:MSFT' },
    { label: 'AMZN', value: 'NASDAQ:AMZN' },
    { label: 'TSLA', value: 'NASDAQ:TSLA' },
  ];

  return (
    <div className={`glass-effect rounded-xl ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={symbol}
              onChange={(e) => onSymbolChange(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {popularSymbols.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
              {intervals.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setInterval(i.value)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    interval === i.value
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={isFullscreen ? 'h-[calc(100%-80px)]' : 'h-[600px]'}>
        <TradingViewWidget
          symbol={symbol}
          interval={interval}
          theme="dark"
          height="100%"
          width="100%"
          allow_symbol_change={true}
          withdateranges={true}
          hide_side_toolbar={false}
          details={true}
          hotlist={true}
          calendar={true}
        />
      </div>
    </div>
  );
}