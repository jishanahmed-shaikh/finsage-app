import { useEffect, useRef } from 'react';

// Define TradingView as a global type
declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol: string;
  container: string;
  height?: number;
  width?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  toolbar?: boolean;
  hideSideToolbar?: boolean;
  details?: boolean;
  hotlist?: boolean;
  calendar?: boolean;
  allowSymbolChange?: boolean;
  saveImage?: boolean;
  autosize?: boolean;
  timeframe?: string;
}

// Map time periods to TradingView intervals
const mapTimeframeToInterval = (timeframe: string): string => {
  switch (timeframe) {
    case '1W': return '30';  // 30 minutes for 1 week
    case '1M': return 'D';   // Daily for 1 month
    case '3M': return 'D';   // Daily for 3 months
    case '1Y': return 'W';   // Weekly for 1 year
    case '5Y': return 'M';   // Monthly for 5 years
    default: return 'D';     // Default to daily
  }
};

// Map time periods to range
const mapTimeframeToRange = (timeframe: string): string => {
  switch (timeframe) {
    case '1W': return '1w';
    case '1M': return '1M';
    case '3M': return '3M';
    case '1Y': return '12M';
    case '5Y': return '60M';
    default: return '1M';
  }
};

const TradingViewChart = ({
  symbol,
  container,
  height = 400,
  width = '100%',
  interval = 'D',
  theme = 'dark',
  toolbar = true,
  hideSideToolbar = false,
  details = false,
  hotlist = false,
  calendar = false,
  allowSymbolChange = true,
  saveImage = true,
  autosize = true,
  timeframe = '1M'
}: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadScript = (): Promise<void> => {
      return new Promise((resolve) => {
        // Check if script already exists
        if (document.getElementById('tradingview-widget-script')) {
          resolve();
          return;
        }
        
        // Create script element
        const script = document.createElement('script');
        script.id = 'tradingview-widget-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => resolve();
        
        document.head.appendChild(script);
      });
    };
    
    const createWidget = () => {
      if (!window.TradingView) return;
      
      // Clean up any existing widget
      const containerElement = document.getElementById(container);
      if (containerElement) {
        containerElement.innerHTML = '';
      }
      
      const disabledFeatures = [];
      const enabledFeatures = [];
      
      if (!toolbar) disabledFeatures.push('header_widget');
      if (hideSideToolbar) disabledFeatures.push('left_toolbar');
      if (!details) disabledFeatures.push('header_symbol_search');
      if (!hotlist) disabledFeatures.push('header_hotlists');
      if (!calendar) disabledFeatures.push('header_calendar');
      if (!saveImage) disabledFeatures.push('header_screenshot');
      
      if (details) enabledFeatures.push('details_widget');
      
      // Determine interval and range based on timeframe
      const tvInterval = timeframe ? mapTimeframeToInterval(timeframe) : interval;
      const range = timeframe ? mapTimeframeToRange(timeframe) : null;
      
      // @ts-ignore - TradingView.widget constructor is called with new
      new window.TradingView.widget({
        autosize,
        symbol,
        interval: tvInterval,
        timezone: "Etc/UTC",
        theme,
        style: "1",
        locale: "en",
        toolbar_bg: theme === 'dark' ? '#2A2E39' : '#F1F3F6',
        enable_publishing: false,
        allow_symbol_change: allowSymbolChange,
        container_id: container,
        height,
        width,
        range,
        disabled_features: disabledFeatures,
        enabled_features: enabledFeatures,
        studies_overrides: {
          "volume.volume.color.0": "#ef5350",
          "volume.volume.color.1": "#26a69a"
        },
        overrides: {
          // Main series style
          "mainSeriesProperties.candleStyle.upColor": "#26a69a",
          "mainSeriesProperties.candleStyle.downColor": "#ef5350",
          "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
          "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",
          // Grid
          "paneProperties.backgroundType": "solid",
          "paneProperties.background": theme === 'dark' ? "#131722" : "#ffffff",
          "paneProperties.gridProperties.color": theme === 'dark' ? "#2A2E39" : "#dde1e4",
          // Scales
          "scalesProperties.textColor": theme === 'dark' ? "#D9D9D9" : "#131722"
        }
      });
    };
    
    loadScript().then(createWidget);
    
    return () => {
      // Intentionally leaving container intact to prevent flicker on re-renders
    };
  }, [symbol, container, height, width, interval, theme, toolbar, hideSideToolbar, details, hotlist, calendar, allowSymbolChange, saveImage, autosize, timeframe]);
  
  return <div id={container} style={{ height: `${height}px`, width }} />;
};

export default TradingViewChart; 