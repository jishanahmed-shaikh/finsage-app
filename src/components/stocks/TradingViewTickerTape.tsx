import { useEffect, useRef } from 'react';

interface TradingViewTickerTapeProps {
  symbols?: string[];
  displayMode?: 'regular' | 'compact' | 'adaptive';
  colorTheme?: string;
}

const defaultSymbols = [
  { description: "Apple", proName: "NASDAQ:AAPL" },
  { description: "Microsoft", proName: "NASDAQ:MSFT" },
  { description: "Google", proName: "NASDAQ:GOOGL" },
  { description: "Amazon", proName: "NASDAQ:AMZN" },
  { description: "Tesla", proName: "NASDAQ:TSLA" },
  { description: "NVIDIA", proName: "NASDAQ:NVDA" },
  { description: "Meta", proName: "NASDAQ:META" },
  { description: "Netflix", proName: "NASDAQ:NFLX" }
];

const TradingViewTickerTape = ({
  symbols = defaultSymbols,
  displayMode = 'regular',
  colorTheme = 'dark'
}: TradingViewTickerTapeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Create the container for the widget
    const container = containerRef.current;
    if (!container) return;
    
    // Clean up any existing widgets
    container.innerHTML = '';
    
    // Create script element for the widget
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    
    // Set widget configuration
    const config = {
      symbols: symbols,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: displayMode,
      colorTheme: colorTheme,
      locale: "en"
    };
    
    script.innerHTML = JSON.stringify(config);
    
    // Add script to container
    container.appendChild(script);
    scriptRef.current = script;
    
    // Cleanup
    return () => {
      if (container && scriptRef.current) {
        container.removeChild(scriptRef.current);
      }
    };
  }, [symbols, displayMode, colorTheme]);
  
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={containerRef}></div>
    </div>
  );
};

export default TradingViewTickerTape; 