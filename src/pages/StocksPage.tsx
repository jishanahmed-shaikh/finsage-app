import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "@/hooks/use-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp, BarChart as BarChartIcon, List, Search, Settings, Download, Plus, BellPlus, Star, Filter, Info, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MarketNews from "@/components/sections/MarketNews";
import { toast } from "sonner";
import StockDetailCard from "@/components/stocks/StockDetailCard";
import CompareStocks from "@/components/stocks/CompareStocks";
import AddToPortfolio from "@/components/stocks/AddToPortfolio";
import TradingViewChart from "@/components/stocks/TradingViewChart";
import TradingViewTickerTape from "@/components/stocks/TradingViewTickerTape";
import { useStockData, useStockDetail, useStockPriceHistory } from "@/hooks/use-stock-data";

// Keep the historical data for charts (this would be replaced with real API data in a production app)
const stockPriceData = [
  { date: "Jan", AAPL: 175.84, GOOGL: 141.32, MSFT: 385.56, AMZN: 154.62 },
  { date: "Feb", AAPL: 182.52, GOOGL: 144.45, MSFT: 391.23, AMZN: 162.08 },
  { date: "Mar", AAPL: 169.21, GOOGL: 133.98, MSFT: 399.67, AMZN: 158.34 },
  { date: "Apr", AAPL: 173.45, GOOGL: 147.56, MSFT: 403.78, AMZN: 169.25 },
  { date: "May", AAPL: 189.98, GOOGL: 152.67, MSFT: 412.36, AMZN: 175.43 },
  { date: "Jun", AAPL: 193.56, GOOGL: 155.89, MSFT: 418.12, AMZN: 178.56 },
  { date: "Jul", AAPL: 201.23, GOOGL: 162.34, MSFT: 425.67, AMZN: 183.78 },
  { date: "Aug", AAPL: 195.46, GOOGL: 158.76, MSFT: 419.23, AMZN: 181.45 },
  { date: "Sep", AAPL: 205.78, GOOGL: 164.23, MSFT: 428.56, AMZN: 188.76 },
  { date: "Oct", AAPL: 213.67, GOOGL: 168.45, MSFT: 435.12, AMZN: 194.32 },
];

const volumeData = [
  { name: "AAPL", volume: 23145698 },
  { name: "MSFT", volume: 18456321 },
  { name: "GOOGL", volume: 12567890 },
  { name: "AMZN", volume: 15234987 },
  { name: "TSLA", volume: 20987456 },
  { name: "NVDA", volume: 17865432 },
  { name: "META", volume: 16543210 },
  { name: "BRK.A", volume: 6543210 },
];

const comparisonData = [
  { date: "2023-Q1", AAPL: 14.4, MSFT: 18.3, GOOGL: 13.7, AMZN: 10.6 },
  { date: "2023-Q2", AAPL: 15.7, MSFT: 20.8, GOOGL: 14.5, AMZN: 11.8 },
  { date: "2023-Q3", AAPL: 19.2, MSFT: 22.4, GOOGL: 16.9, AMZN: 13.4 },
  { date: "2023-Q4", AAPL: 21.5, MSFT: 25.1, GOOGL: 18.2, AMZN: 14.9 },
  { date: "2024-Q1", AAPL: 20.3, MSFT: 27.6, GOOGL: 16.8, AMZN: 16.2 },
];

const defaultWatchlist = ["AAPL", "MSFT", "GOOGL"];

const StocksPage = () => {
  // Use navigation hook to handle route changes properly
  useNavigation();
  
  // Use our custom hooks for real-time stock data
  const { stocks: trendingStocks, loading, error } = useStockData();
  
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("1M");
  const [showCompare, setShowCompare] = useState(false);
  const [watchlist, setWatchlist] = useState(defaultWatchlist);
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [showPositiveOnly, setShowPositiveOnly] = useState(false);
  const [showTradingView, setShowTradingView] = useState(true);

  // Get details for the selected stock
  const { stock: selectedStockDetails } = useStockDetail(selectedStock);
  
  // Get historical price data based on the selected time range
  const { priceData, loading: historyLoading } = useStockPriceHistory(selectedStock, timeRange);

  const filteredStocks = trendingStocks.filter(stock => {
    // Filter by search term
    const matchesSearch = 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by industry
    const matchesIndustry = filterIndustry === "All" || stock.industry === filterIndustry;
    
    // Filter by performance
    const matchesPerformance = !showPositiveOnly || stock.changePercent > 0;
    
    return matchesSearch && matchesIndustry && matchesPerformance;
  });

  // Get unique list of industries from the stock data
  const industries = ["All", ...Array.from(new Set(trendingStocks.map(stock => stock.industry)))];

  const toggleWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(watchlist.filter(s => s !== symbol));
      toast.info(`${symbol} removed from watchlist`);
    } else {
      setWatchlist([...watchlist, symbol]);
      toast.success(`${symbol} added to watchlist`);
    }
  };

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
    toast.info(`${symbol} data updated`);
  };

  const handleExportData = () => {
    // In a real app, this would export data to CSV or similar
    toast.success("Stock data exported successfully");
  };

  const handleSetAlert = (stock: string) => {
    // In a real app, this would set up price alerts
    toast.success(`Price alert set for ${stock}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading stock data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-lg">Error loading stock data: {error}</p>
          <Button 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-3 px-4 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">FinSage Portfolio</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">Chat</Link>
            <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
            <Link to="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <span className="sr-only">User profile</span>
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
                JD
              </div>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Trading View Ticker Tape */}
      <div className="w-full py-1 border-b">
        <TradingViewTickerTape />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Stock Performance</h1>
              <p className="text-muted-foreground">Track and analyze real-time market data</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search stocks..." 
                  className="pl-9 w-[240px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by industry</h4>
                      <Select defaultValue={filterIndustry} onValueChange={setFilterIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="positive-change" 
                        checked={showPositiveOnly}
                        onCheckedChange={setShowPositiveOnly}
                      />
                      <Label htmlFor="positive-change">Show positive performers only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="trading-view" 
                        checked={showTradingView}
                        onCheckedChange={setShowTradingView}
                      />
                      <Label htmlFor="trading-view">Use TradingView chart</Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setShowCompare(true)}>
                    <BarChartIcon className="h-4 w-4" />
                    Compare
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Compare Stocks</DialogTitle>
                    <DialogDescription>
                      Select stocks to compare their performance
                    </DialogDescription>
                  </DialogHeader>
                  <CompareStocks stocks={trendingStocks} />
                </DialogContent>
              </Dialog>
              
              <Link to="/dashboard">
                <Button variant="default" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Main Stock Chart */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle>Market Trends</CardTitle>
                  <CardDescription>Stock price movement over time</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
                    <TabsList>
                      <TabsTrigger value="1W">1W</TabsTrigger>
                      <TabsTrigger value="1M">1M</TabsTrigger>
                      <TabsTrigger value="3M">3M</TabsTrigger>
                      <TabsTrigger value="1Y">1Y</TabsTrigger>
                      <TabsTrigger value="5Y">5Y</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleExportData}
                    title="Export data"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {showTradingView ? (
                  <TradingViewChart 
                    symbol={selectedStock ? `NASDAQ:${selectedStock}` : 'NASDAQ:AAPL'} 
                    container="tv-chart-container"
                    height={320}
                    timeframe={timeRange}
                  />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {historyLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <LineChart 
                        data={priceData} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        onClick={(data) => {
                          if (data && data.activePayload) {
                            const date = data.activePayload[0].payload.date;
                            toast.info(`Selected data from ${date}`);
                          }
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, '']} 
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="close" 
                          name={selectedStock} 
                          stroke="#0088FE" 
                          strokeWidth={2} 
                          dot={false} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Top Performing Stocks */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Top Performing Stocks</CardTitle>
                  <CardDescription>Market performance of trending stocks</CardDescription>
                </div>
                <Select 
                  defaultValue="gainers"
                  onValueChange={(val) => {
                    toast.info(`Viewing ${val === "gainers" ? "top gainers" : "top losers"}`);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gainers">Top Gainers</SelectItem>
                    <SelectItem value="losers">Top Losers</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground p-2">
                    <div>SYMBOL</div>
                    <div className="col-span-2">COMPANY</div>
                    <div className="text-right">PRICE</div>
                    <div className="text-right">CHANGE</div>
                  </div>
                  <div className="divide-y">
                    {filteredStocks.map((stock) => (
                      <div 
                        key={stock.symbol} 
                        className="grid grid-cols-5 py-3 px-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
                        onClick={() => handleStockClick(stock.symbol)}
                      >
                        <div className="font-medium flex items-center gap-1">
                          {stock.symbol}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(stock.symbol);
                            }}
                          >
                            <Star 
                              className="h-3.5 w-3.5" 
                              fill={watchlist.includes(stock.symbol) ? "currentColor" : "none"} 
                            />
                          </Button>
                        </div>
                        <div className="col-span-2 truncate">{stock.name}</div>
                        <div className="text-right font-medium">${stock.price.toLocaleString()}</div>
                        <div className={`text-right flex items-center justify-end ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.changePercent >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                          {Math.abs(stock.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stock Details */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Details</CardTitle>
                <CardDescription>Additional information and trading options</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedStockDetails ? (
                  <StockDetailCard 
                    stock={selectedStockDetails} 
                    onSetAlert={handleSetAlert}
                    onAddToPortfolio={(symbol) => toast.success(`${symbol} added to portfolio`)}
                    onViewDetails={(symbol) => toast.info(`Viewing details for ${symbol}`)}
                    isInWatchlist={watchlist.includes(selectedStockDetails.symbol)}
                    onToggleWatchlist={toggleWatchlist}
                  />
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Select a stock to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Watchlist */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {watchlist.length === 0 ? (
                <div className="col-span-full flex items-center justify-center p-8 border rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Your watchlist is empty</p>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add stocks to watchlist
                    </Button>
                  </div>
                </div>
              ) : (
                watchlist.map(symbol => {
                  const stock = trendingStocks.find(s => s.symbol === symbol);
                  
                  if (!stock) {
                    return null;
                  }
                  
                  return (
                    <Card key={symbol} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{stock.symbol}</CardTitle>
                            <CardDescription className="text-xs truncate">{stock.name}</CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 -mt-1" 
                            onClick={() => toggleWatchlist(symbol)}
                          >
                            <Star className="h-4 w-4" fill="currentColor" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="mb-2">
                          <div className="text-lg font-bold">${stock.price.toLocaleString()}</div>
                          <div className={`text-sm flex items-center ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changePercent >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                            {Math.abs(stock.changePercent).toFixed(2)}%
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => handleStockClick(symbol)}
                          >
                            View
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="text-xs"
                              >
                                Add to Portfolio
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add to Portfolio</DialogTitle>
                              </DialogHeader>
                              <AddToPortfolio 
                                stock={stock} 
                                onSubmit={() => toast.success(`${symbol} added to portfolio`)} 
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Market News */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Market News</h2>
            <MarketNews />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StocksPage;
