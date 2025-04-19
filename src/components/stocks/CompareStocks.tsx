
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  industry: string;
  marketCap: string;
}

interface CompareStocksProps {
  stocks: Stock[];
}

// Sample comparison data
const performanceData = [
  { date: '2023-Q1', AAPL: 7.2, MSFT: 5.8, GOOGL: 3.1, AMZN: 1.5, TSLA: 10.2, NVDA: 8.5, META: 4.3 },
  { date: '2023-Q2', AAPL: 3.5, MSFT: 6.2, GOOGL: 4.8, AMZN: 3.1, TSLA: -2.1, NVDA: 9.4, META: 5.1 },
  { date: '2023-Q3', AAPL: 5.1, MSFT: 4.5, GOOGL: 6.2, AMZN: 7.5, TSLA: 5.6, NVDA: 12.3, META: 2.5 },
  { date: '2023-Q4', AAPL: 8.3, MSFT: 7.6, GOOGL: 5.4, AMZN: 9.2, TSLA: 4.8, NVDA: 15.6, META: 6.3 },
  { date: '2024-Q1', AAPL: 6.5, MSFT: 8.9, GOOGL: 4.3, AMZN: 8.7, TSLA: -4.2, NVDA: 18.2, META: 7.1 },
];

const CompareStocks = ({ stocks }: CompareStocksProps) => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['AAPL', 'MSFT', 'GOOGL']);
  const [metric, setMetric] = useState<string>('performance');
  
  const handleStockToggle = (symbol: string) => {
    if (selectedStocks.includes(symbol)) {
      if (selectedStocks.length > 1) { // Ensure at least one stock is selected
        setSelectedStocks(selectedStocks.filter(s => s !== symbol));
      }
    } else {
      if (selectedStocks.length < 4) { // Limit to 4 stocks for better chart readability
        setSelectedStocks([...selectedStocks, symbol]);
      } else {
        toast.warning("You can compare up to 4 stocks at once");
      }
    }
  };
  
  const handleExport = () => {
    toast.success("Comparison data exported successfully");
  };
  
  // Define colors for each stock
  const stockColors: {[key: string]: string} = {
    AAPL: '#0088FE',
    MSFT: '#00C49F',
    GOOGL: '#FFBB28',
    AMZN: '#FF8042',
    TSLA: '#FF0000',
    NVDA: '#9c27b0',
    META: '#3f51b5',
    'BRK.A': '#607d8b'
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-wrap gap-2">
        {stocks.map((stock) => (
          <Button 
            key={stock.symbol}
            variant={selectedStocks.includes(stock.symbol) ? "default" : "outline"}
            size="sm"
            onClick={() => handleStockToggle(stock.symbol)}
            className="flex-shrink-0"
          >
            {stock.symbol}
          </Button>
        ))}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Comparison Metric</label>
        <Select defaultValue={metric} onValueChange={setMetric}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="performance">% Change (Performance)</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="volume">Trading Volume</SelectItem>
            <SelectItem value="pe">P/E Ratio</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={performanceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value}%`, metric === 'performance' ? 'Performance' : '']}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Legend />
            {selectedStocks.map((symbol) => (
              <Line 
                key={symbol}
                type="monotone" 
                dataKey={symbol} 
                stroke={stockColors[symbol] || '#999'} 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between pt-2">
        <p className="text-sm text-muted-foreground">
          Comparing {selectedStocks.length} stocks
        </p>
        <Button onClick={handleExport}>Export Data</Button>
      </div>
    </div>
  );
};

export default CompareStocks;
