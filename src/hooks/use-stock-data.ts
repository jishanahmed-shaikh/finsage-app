import { useState, useEffect } from 'react';
import { 
  getStockQuote, 
  getBatchStockQuotes, 
  getCompanyProfile, 
  getStockCandles, 
  getTimeRangeTimestamps, 
  getResolutionForTimeRange, 
  formatCandleData,
  FinnhubQuote
} from '@/lib/finnhub-api';

// Define an interface for the stock data with all the properties we need
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  industry: string;
  marketCap: string;
  pe?: number;
  dividendYield?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  avgVolume?: number;
}

// Map of full company names for different stock symbols
const COMPANY_NAMES: Record<string, string> = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc.',
  'AMZN': 'Amazon.com Inc.',
  'TSLA': 'Tesla Inc.',
  'NVDA': 'NVIDIA Corporation',
  'META': 'Meta Platforms Inc.',
  'NFLX': 'Netflix Inc.',
  'UBER': 'Uber Technologies Inc.',
  'ABNB': 'Airbnb Inc.',
  'INTC': 'Intel Corporation',
  'NKE': 'Nike Inc.'
};

// List of stock symbols to track
const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'UBER', 'ABNB', 'INTC', 'NKE'];

// Helper function to format market cap
const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `${marketCap.toFixed(2)}`;
  }
};

// Hook to get real-time stock data from Finnhub API
export function useStockData() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Get all quotes in batch
        const quotes = await getBatchStockQuotes(DEFAULT_SYMBOLS);
        
        // Get additional information for each stock
        const stocksData = await Promise.all(
          DEFAULT_SYMBOLS.map(async (symbol) => {
            const quote = quotes[symbol] || await getStockQuote(symbol);
            const profile = await getCompanyProfile(symbol);
            
            // Calculate 52-week high and low
            const yearAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;
            const now = Math.floor(Date.now() / 1000);
            const candles = await getStockCandles(symbol, 'W', yearAgo, now);
            
            let fiftyTwoWeekHigh = quote.c;
            let fiftyTwoWeekLow = quote.c;
            
            if (candles.s === 'ok' && candles.h.length > 0) {
              fiftyTwoWeekHigh = Math.max(...candles.h);
              fiftyTwoWeekLow = Math.min(...candles.l);
            }
            
            // Format the stock data
            const stockData: StockData = {
              symbol,
              name: profile?.name || COMPANY_NAMES[symbol] || symbol,
              price: quote.c,
              change: quote.d,
              changePercent: quote.dp,
              industry: profile?.finnhubIndustry || 'N/A',
              marketCap: profile ? formatMarketCap(profile.marketCapitalization) : 'N/A',
              // These values could be obtained from additional API calls in a production app
              pe: 0,
              dividendYield: 0,
              fiftyTwoWeekHigh,
              fiftyTwoWeekLow,
              avgVolume: 0
            };
            
            return stockData;
          })
        );
        
        setStocks(stocksData);
        setLoading(false);
        
        // Set up polling for real-time updates
        const updateInterval = setInterval(async () => {
          try {
            const updatedQuotes = await getBatchStockQuotes(DEFAULT_SYMBOLS);
            
            setStocks(prevStocks => 
              prevStocks.map(stock => {
                const updatedQuote = updatedQuotes[stock.symbol];
                if (!updatedQuote) return stock;
                
                return {
                  ...stock,
                  price: updatedQuote.c,
                  change: updatedQuote.d,
                  changePercent: updatedQuote.dp
                };
              })
            );
          } catch (updateError) {
            console.error('Error updating stock data:', updateError);
          }
        }, 30000); // Update every 30 seconds
        
        return () => clearInterval(updateInterval);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };
    
    fetchStockData();
  }, []);
  
  return { stocks, loading, error };
}

// Hook to get data for a single stock
export function useStockDetail(symbol: string) {
  const [stock, setStock] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }
    
    const fetchStockDetail = async () => {
      try {
        // Get stock quote
        const quote = await getStockQuote(symbol);
        
        // Get company profile
        const profile = await getCompanyProfile(symbol);
        
        // Calculate 52-week high and low
        const yearAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;
        const now = Math.floor(Date.now() / 1000);
        const candles = await getStockCandles(symbol, 'W', yearAgo, now);
        
        let fiftyTwoWeekHigh = quote.c;
        let fiftyTwoWeekLow = quote.c;
        
        if (candles.s === 'ok' && candles.h.length > 0) {
          fiftyTwoWeekHigh = Math.max(...candles.h);
          fiftyTwoWeekLow = Math.min(...candles.l);
        }
        
        // Format the stock data
        const stockData: StockData = {
          symbol,
          name: profile?.name || COMPANY_NAMES[symbol] || symbol,
          price: quote.c,
          change: quote.d,
          changePercent: quote.dp,
          industry: profile?.finnhubIndustry || 'N/A',
          marketCap: profile ? formatMarketCap(profile.marketCapitalization) : 'N/A',
          // These values could be obtained from additional API calls in a production app
          pe: 0,
          dividendYield: 0,
          fiftyTwoWeekHigh,
          fiftyTwoWeekLow,
          avgVolume: 0
        };
        
        setStock(stockData);
        setLoading(false);
        
        // Set up polling for real-time updates
        const updateInterval = setInterval(async () => {
          try {
            const updatedQuote = await getStockQuote(symbol);
            
            setStock(prevStock => {
              if (!prevStock) return null;
              
              return {
                ...prevStock,
                price: updatedQuote.c,
                change: updatedQuote.d,
                changePercent: updatedQuote.dp
              };
            });
          } catch (updateError) {
            console.error('Error updating stock detail:', updateError);
          }
        }, 10000); // Update every 10 seconds
        
        return () => clearInterval(updateInterval);
      } catch (err) {
        console.error('Error fetching stock detail:', err);
        setError('Failed to fetch stock detail');
        setLoading(false);
      }
    };
    
    fetchStockDetail();
  }, [symbol]);
  
  return { stock, loading, error };
}

// Hook to fetch historical price data based on timeframe
export function useStockPriceHistory(symbol: string, timeRange: string) {
  const [priceData, setPriceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }
    
    const fetchPriceHistory = async () => {
      try {
        // Get appropriate time range and resolution
        const { from, to } = getTimeRangeTimestamps(timeRange);
        const resolution = getResolutionForTimeRange(timeRange);
        
        // Fetch candle data
        const candles = await getStockCandles(symbol, resolution, from, to);
        
        // Format the data for charts
        const formattedData = formatCandleData(candles);
        
        setPriceData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching price history:', err);
        setError('Failed to fetch price history');
        setLoading(false);
      }
    };
    
    fetchPriceHistory();
  }, [symbol, timeRange]);
  
  return { priceData, loading, error };
} 