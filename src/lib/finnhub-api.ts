import axios from 'axios';

// Base URL for Finnhub API
const FINNHUB_API_URL = 'https://finnhub.io/api/v1';

// Try to get API key from environment variables, otherwise use a placeholder
// In production, you should always use environment variables
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd04flmhr01qspgm2njggd04flmhr01qspgm2njh0';

// Log a warning if using the demo key
if (FINNHUB_API_KEY === 'demo_finnhub_api_key') {
  console.warn('Using demo Finnhub API key. Please set your own API key in environment variables.');
}

// Interface for Finnhub stock quote response
export interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

// Interface for Finnhub company profile response
export interface FinnhubCompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

// Interface for Finnhub candle data response
export interface FinnhubCandles {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string;   // Status
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

// Interface for Finnhub price target response
export interface FinnhubPriceTarget {
  lastUpdated: string;
  symbol: string;
  targetHigh: number;
  targetLow: number;
  targetMean: number;
  targetMedian: number;
}

// Function to get real-time quote for a stock
export const getStockQuote = async (symbol: string): Promise<FinnhubQuote> => {
  try {
    const response = await axios.get(`${FINNHUB_API_URL}/quote`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    // Return default data in case of error (for demo only)
    return {
      c: 0,
      d: 0,
      dp: 0,
      h: 0,
      l: 0,
      o: 0,
      pc: 0,
      t: 0,
    };
  }
};

// Function to get company profile information
export const getCompanyProfile = async (symbol: string): Promise<FinnhubCompanyProfile | null> => {
  try {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/profile2`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
};

// Function to get candle data for a stock
export const getStockCandles = async (
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<FinnhubCandles> => {
  try {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/candle`, {
      params: {
        symbol,
        resolution,
        from,
        to,
        token: FINNHUB_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching stock candles:', error);
    // Return default data in case of error (for demo only)
    return {
      c: [],
      h: [],
      l: [],
      o: [],
      s: 'error',
      t: [],
      v: [],
    };
  }
};

// Function to get peers for a stock
export const getStockPeers = async (symbol: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/peers`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching stock peers:', error);
    return [];
  }
};

// Function to get price target for a stock
export const getPriceTarget = async (symbol: string): Promise<FinnhubPriceTarget | null> => {
  try {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/price-target`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching price target:', error);
    return null;
  }
};

// Function to get multiple stock quotes at once
export const getBatchStockQuotes = async (symbols: string[]): Promise<Record<string, FinnhubQuote>> => {
  try {
    const quotes: Record<string, FinnhubQuote> = {};
    
    // Make parallel requests for all symbols
    await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await getStockQuote(symbol);
        quotes[symbol] = quote;
      })
    );
    
    return quotes;
  } catch (error) {
    console.error('Error fetching batch stock quotes:', error);
    return {};
  }
};

// Function to convert timestamp to date format for chart display
export const formatCandleData = (candles: FinnhubCandles) => {
  if (candles.s !== 'ok' || candles.t.length === 0) {
    return [];
  }
  
  return candles.t.map((timestamp, index) => {
    const date = new Date(timestamp * 1000);
    return {
      date: date.toISOString().split('T')[0],
      open: candles.o[index],
      high: candles.h[index],
      low: candles.l[index],
      close: candles.c[index],
      volume: candles.v[index],
    };
  });
};

// Helper function to convert time periods to Unix timestamps
export const getTimeRangeTimestamps = (timeRange: string): { from: number; to: number } => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const to = now;
  let from = now;
  
  switch (timeRange) {
    case '1W':
      from = now - 7 * 24 * 60 * 60; // 7 days
      break;
    case '1M':
      from = now - 30 * 24 * 60 * 60; // 30 days
      break;
    case '3M':
      from = now - 90 * 24 * 60 * 60; // 90 days
      break;
    case '1Y':
      from = now - 365 * 24 * 60 * 60; // 1 year
      break;
    case '5Y':
      from = now - 5 * 365 * 24 * 60 * 60; // 5 years
      break;
    default:
      from = now - 30 * 24 * 60 * 60; // Default to 1 month
  }
  
  return { from, to };
};

// Function to determine the appropriate resolution based on time range
export const getResolutionForTimeRange = (timeRange: string): string => {
  switch (timeRange) {
    case '1W':
      return '60'; // 60 minutes
    case '1M':
      return 'D'; // Daily
    case '3M':
      return 'D'; // Daily
    case '1Y':
      return 'W'; // Weekly
    case '5Y':
      return 'M'; // Monthly
    default:
      return 'D'; // Default to daily
  }
}; 