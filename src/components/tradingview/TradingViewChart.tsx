import { useEffect, useRef } from 'react';

// Note: You need to properly import the TradingView library types
// This is just for demonstration
declare global {
  interface Window {
    TradingView: {
      widget: any;
      Datafeed: any;
    };
  }
}

interface ChartingLibraryWidgetOptions {
  symbol: string;
  interval: string;
  libraryPath: string;
  chartsStorageUrl: string;
  chartsStorageApiVersion: string;
  clientId: string;
  userId: string;
  fullscreen: boolean;
  autosize: boolean;
  studiesOverrides: Record<string, any>;
}

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  containerId?: string;
}

export function TradingViewChart({
  symbol = 'NASDAQ:AAPL',
  interval = 'D',
  theme = 'dark',
  containerId = 'tv_chart_container'
}: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tvWidgetRef = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!chartContainerRef.current) return;

      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol,
        interval,
        libraryPath: '/charting_library/', // Path to library files
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'your_client_id',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {
          'volume.volume.color.0': '#EF4444',
          'volume.volume.color.1': '#22C55E',
        },
      };

      const tvWidget = new window.TradingView.widget({
        ...widgetOptions,
        container: chartContainerRef.current,
        datafeed: new window.TradingView.Datafeed.UDF({
          // Configure your data feed here
          // This is where you would integrate with your backend
          supportedResolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
        }),
        library_path: widgetOptions.libraryPath,
        locale: 'en',
        disabled_features: [
          'use_localstorage_for_settings',
          'header_symbol_search',
          'header_screenshot',
        ],
        enabled_features: [
          'study_templates',
          'dome_widget',
        ],
        theme: theme,
        overrides: {
          'mainSeriesProperties.candleStyle.upColor': '#22C55E',
          'mainSeriesProperties.candleStyle.downColor': '#EF4444',
          'mainSeriesProperties.candleStyle.borderUpColor': '#22C55E',
          'mainSeriesProperties.candleStyle.borderDownColor': '#EF4444',
          'mainSeriesProperties.candleStyle.wickUpColor': '#22C55E',
          'mainSeriesProperties.candleStyle.wickDownColor': '#EF4444',
        },
        loading_screen: {
          backgroundColor: theme === 'dark' ? '#1E293B' : '#ffffff',
          foregroundColor: '#8B5CF6',
        },
      });

      tvWidgetRef.current = tvWidget;
    };

    initChart();

    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div 
      id={containerId}
      ref={chartContainerRef}
      className="w-full h-full min-h-[500px] rounded-xl overflow-hidden"
    />
  );
}