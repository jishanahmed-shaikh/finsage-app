import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellPlus, Star, ArrowDown, ArrowUp, Briefcase, LineChart, ChevronRight, AlertTriangle } from "lucide-react";
import AddToPortfolio from "./AddToPortfolio";
import TradingViewChart from "./TradingViewChart";
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

interface StockDetailCardProps {
  stock: Stock;
  onSetAlert: (symbol: string) => void;
  onAddToPortfolio: (symbol: string) => void;
  onViewDetails: (symbol: string) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

const StockDetailCard = ({ 
  stock, 
  onSetAlert, 
  onAddToPortfolio, 
  onViewDetails,
  isInWatchlist,
  onToggleWatchlist
}: StockDetailCardProps) => {
  const [showAddToPortfolio, setShowAddToPortfolio] = useState(false);
  const [miniChartLoaded, setMiniChartLoaded] = useState(false);
  
  const chartContainerId = `mini-chart-${stock.symbol.toLowerCase()}`;
  
  return (
    <div className="space-y-4">
      <div>
        <div className="text-3xl font-bold">
          ${stock.price.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          ${stock.change.toFixed(2)} today
          <span className={`ml-2 ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {stock.changePercent >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
            {Math.abs(stock.changePercent).toFixed(2)}%
          </span>
        </div>
      </div>
      
      {/* Mini TradingView Chart */}
      <div className="h-32 w-full border rounded-md overflow-hidden">
        <TradingViewChart 
          symbol={`NASDAQ:${stock.symbol}`}
          container={chartContainerId}
          height={128}
          interval="60"
          theme="light"
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="font-medium">${stock.marketCap}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">P/E Ratio</div>
              <div className="font-medium">{stock.pe?.toFixed(2) || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">52W High</div>
              <div className="font-medium">
                ${stock.fiftyTwoWeekHigh?.toFixed(2) || (stock.price * 1.15).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">52W Low</div>
              <div className="font-medium">
                ${stock.fiftyTwoWeekLow?.toFixed(2) || (stock.price * 0.82).toFixed(2)}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="financials" className="space-y-4 pt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Volume</div>
              <div className="font-medium">
                {stock.avgVolume?.toLocaleString() || 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Dividend Yield</div>
              <div className="font-medium">
                {stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sector</div>
              <div className="font-medium">{stock.industry}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">EPS (TTM)</div>
              <div className="font-medium">
                ${(stock.price / (stock.pe || 20)).toFixed(2)}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between pt-2 space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 flex-1" 
          onClick={() => onSetAlert(stock.symbol)}
        >
          <BellPlus className="h-4 w-4" />
          Set Alert
        </Button>
        
        <Button 
          variant={isInWatchlist ? "secondary" : "outline"} 
          size="sm"
          className="flex items-center gap-1 flex-1" 
          onClick={() => onToggleWatchlist(stock.symbol)}
        >
          <Star className="h-4 w-4" fill={isInWatchlist ? "currentColor" : "none"} />
          {isInWatchlist ? 'Watching' : 'Watch'}
        </Button>
      </div>
      
      <div className="pt-1">
        <Dialog open={showAddToPortfolio} onOpenChange={setShowAddToPortfolio}>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => setShowAddToPortfolio(true)}
            >
              Add to Portfolio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add {stock.symbol} to Your Portfolio</DialogTitle>
            </DialogHeader>
            <AddToPortfolio 
              stock={stock} 
              onSubmit={() => {
                onAddToPortfolio(stock.symbol);
                setShowAddToPortfolio(false);
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Button 
        variant="link" 
        className="px-0 h-auto text-sm text-primary-600 w-full text-left" 
        onClick={() => onViewDetails(stock.symbol)}
      >
        View Detailed Analysis <ChevronRight className="h-3 w-3 inline ml-1" />
      </Button>
    </div>
  );
};

export default StockDetailCard;
