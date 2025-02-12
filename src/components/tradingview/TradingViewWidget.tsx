import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  width?: string | number;
  height?: string | number;
  interval?: string;
  timezone?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  withdateranges?: boolean;
  hide_side_toolbar?: boolean;
  allow_symbol_change?: boolean;
  details?: boolean;
  hotlist?: boolean;
  calendar?: boolean;
  studies?: string[];
}

export function TradingViewWidget({
  symbol = 'NASDAQ:AAPL',
  theme = 'dark',
  width = '100%',
  height = 500,
  interval = 'D',
  timezone = 'Etc/UTC',
  style = '1',
  locale = 'en',
  toolbar_bg = '#1E293B',
  enable_publishing = false,
  withdateranges = true,
  hide_side_toolbar = false,
  allow_symbol_change = true,
  details = true,
  hotlist = true,
  calendar = true,
  studies = []
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TradingView script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Configure widget
    script.innerHTML = JSON.stringify({
      width,
      height,
      symbol,
      interval,
      timezone,
      theme,
      style,
      locale,
      toolbar_bg,
      enable_publishing,
      withdateranges,
      hide_side_toolbar,
      allow_symbol_change,
      details,
      hotlist,
      calendar,
      studies,
      container_id: container.current?.id,
    });

    // Add script to container
    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector('script');
        if (scriptElement) {
          scriptElement.remove();
        }
      }
    };
  }, [
    symbol,
    theme,
    width,
    height,
    interval,
    timezone,
    style,
    locale,
    toolbar_bg,
    enable_publishing,
    withdateranges,
    hide_side_toolbar,
    allow_symbol_change,
    details,
    hotlist,
    calendar,
    studies
  ]);

  return (
    <div 
      id={`tradingview_${Math.random().toString(36).substring(7)}`}
      ref={container}
      className="tradingview-widget-container"
    />
  );
}