import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TradingViewChart from './TradingViewChart';
import { toast } from "sonner";

interface Stock {
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

interface CompareStocksProps {
  stocks: Stock[];
}

// Colors for different stocks in the comparison chart
const stockColors = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#8884D8", "#82CA9D", "#FF6B6B", "#6B88FF"
];

const CompareStocks = ({ stocks }: CompareStocksProps) => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(["AAPL"]);
  const [chartType, setChartType] = useState<'line' | 'tradingview'>('line');
  const [timeRange, setTimeRange] = useState<string>("1M");
  
  // Mock price history data for comparison chart
  const [comparisonData] = useState(() => {
    // Generate 30 days of data
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      return date.toISOString().slice(0, 10);
    });
    
    // Generate price data for each stock
    const data = dates.map((date) => {
      const entry: any = { date };
      
      stocks.forEach((stock) => {
        // Base price is current price minus random fluctuation
        const volatility = Math.random() * 0.2 - 0.1; // -10% to +10%
        const basePrice = stock.price * (1 - volatility * (30 / (dates.indexOf(date) + 1)));
        entry[stock.symbol] = parseFloat(basePrice.toFixed(2));
      });
      
      return entry;
    });
    
    return data;
  });
  
  const handleAddStock = (symbol: string) => {
    // Limit to 4 stocks for better visualization
    if (selectedStocks.includes(symbol)) {
      toast.error("This stock is already in comparison");
      return;
    }
    
    if (selectedStocks.length >= 4) {
      toast.error("Maximum 4 stocks can be compared at once");
      return;
    }
    
    setSelectedStocks([...selectedStocks, symbol]);
    toast.success(`Added ${symbol} to comparison`);
  };
  
  const handleRemoveStock = (symbol: string) => {
    if (selectedStocks.length <= 1) {
      toast.error("At least one stock must be selected");
      return;
    }
    
    setSelectedStocks(selectedStocks.filter(s => s !== symbol));
    toast.success(`Removed ${symbol} from comparison`);
  };
  
  const normalizeData = (data: any[]) => {
    // Only include selected stocks in the data
    const filteredData = data.map(day => {
      const entry: any = { date: day.date };
      selectedStocks.forEach(symbol => {
        entry[symbol] = day[symbol];
      });
      return entry;
    });
    
    return filteredData;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Select onValueChange={handleAddStock}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Add stock to compare" />
          </SelectTrigger>
          <SelectContent>
            {stocks
              .filter(stock => !selectedStocks.includes(stock.symbol))
              .map(stock => (
                <SelectItem key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - {stock.name}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">1W</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
            <SelectItem value="5Y">5Y</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue={chartType} onValueChange={(value: any) => setChartType(value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="tradingview">TradingView Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedStocks.map((symbol, index) => {
          const stock = stocks.find(s => s.symbol === symbol);
          if (!stock) return null;
          
          return (
            <div key={symbol} className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stockColors[index % stockColors.length] }}></div>
              <span>{symbol}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1"
                onClick={() => handleRemoveStock(symbol)}
              >
                ×
              </Button>
            </div>
          );
        })}
      </div>
      
      <div className="h-72 border rounded-md p-4">
        {chartType === 'line' ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
              data={normalizeData(comparisonData)} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
            <Tooltip 
                formatter={(value) => [`$${value}`, '']} 
                labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
              {selectedStocks.map((symbol, index) => (
              <Line 
                key={symbol}
                type="monotone" 
                dataKey={symbol} 
                  stroke={stockColors[index % stockColors.length]} 
                  strokeWidth={2} 
                  dot={false} 
                activeDot={{ r: 8 }} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        ) : (
          // If TradingView chart is selected, show the first selected stock
          // and use overlay comparison for others
          <TradingViewChart 
            symbol={`NASDAQ:${selectedStocks[0]}`}
            container="compare-tv-chart"
            height={270}
            timeframe={timeRange}
            details={true}
            allowSymbolChange={false}
          />
        )}
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        {chartType === 'line' 
          ? 'Line chart shows relative performance over time'
          : 'TradingView chart provides detailed technical analysis'}
      </div>
    </div>
  );
};

export default CompareStocks;
