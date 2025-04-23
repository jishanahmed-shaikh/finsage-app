// Type definitions for TradingView
interface TradingViewWidget {
  symbol: string;
  width?: string | number;
  height?: string | number;
  interval?: string;
  timezone?: string;
  theme?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  allow_symbol_change?: boolean;
  container_id?: string;
  hide_top_toolbar?: boolean;
  hide_side_toolbar?: boolean;
  save_image?: boolean;
  studies?: string[];
  show_popup_button?: boolean;
  popup_width?: string | number;
  popup_height?: string | number;
  disabled_features?: string[];
  enabled_features?: string[];
  overrides?: Record<string, unknown>;
  studies_overrides?: Record<string, unknown>;
  custom_css_url?: string;
  loading_screen?: Record<string, unknown>;
  favorites?: {
    intervals?: string[];
    chartTypes?: string[];
  };
  autosize?: boolean;
}

// TradingView widget constructor
interface TradingViewStatic {
  widget: new (config: TradingViewWidget) => unknown;
}

// TradingView Ticker Tape configuration
interface TradingViewTickerTapeConfig {
  symbols?: Array<{ proName: string; title: string }>;
  showSymbolLogo?: boolean;
  isTransparent?: boolean;
  displayMode?: 'regular' | 'compact' | 'adaptive';
  colorTheme?: 'light' | 'dark';
  locale?: string;
}

declare global {
  interface Window {
    TradingView: TradingViewStatic;
  }
}

export { TradingViewWidget, TradingViewTickerTapeConfig }; 