
import { useState } from "react";
import { Link } from "react-router-dom";
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

const trendingStocks = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 213.67, 
    change: 7.89, 
    changePercent: 3.83, 
    industry: "Technology",
    marketCap: "3.38T",
    pe: 32.4,
    dividendYield: 0.5,
    fiftyTwoWeekHigh: 234.43,
    fiftyTwoWeekLow: 164.52,
    avgVolume: 23145698
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corporation", 
    price: 435.12, 
    change: 6.56, 
    changePercent: 1.53, 
    industry: "Technology",
    marketCap: "3.24T",
    pe: 38.7,
    dividendYield: 0.7,
    fiftyTwoWeekHigh: 452.90,
    fiftyTwoWeekLow: 375.40,
    avgVolume: 18456321
  },
  { 
    symbol: "GOOGL", 
    name: "Alphabet Inc.", 
    price: 168.45, 
    change: 4.22, 
    changePercent: 2.57, 
    industry: "Technology",
    marketCap: "2.13T",
    pe: 25.3,
    dividendYield: 0.0,
    fiftyTwoWeekHigh: 178.32,
    fiftyTwoWeekLow: 120.21,
    avgVolume: 12567890
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com Inc.", 
    price: 194.32, 
    change: 5.56, 
    changePercent: 2.94, 
    industry: "Consumer Cyclical",
    marketCap: "2.02T",
    pe: 60.4,
    dividendYield: 0.0,
    fiftyTwoWeekHigh: 205.45,
    fiftyTwoWeekLow: 148.78,
    avgVolume: 15234987
  },
  { 
    symbol: "TSLA", 
    name: "Tesla Inc.", 
    price: 227.22, 
    change: -3.45, 
    changePercent: -1.50, 
    industry: "Automotive",
    marketCap: "721.76B",
    pe: 55.8,
    dividendYield: 0.0,
    fiftyTwoWeekHigh: 278.98,
    fiftyTwoWeekLow: 138.76,
    avgVolume: 20987456
  },
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corporation", 
    price: 124.06, 
    change: 2.18, 
    changePercent: 1.79, 
    industry: "Technology",
    marketCap: "1.53T",
    pe: 72.5,
    dividendYield: 0.1,
    fiftyTwoWeekHigh: 140.24,
    fiftyTwoWeekLow: 85.32,
    avgVolume: 17865432
  },
  { 
    symbol: "META", 
    name: "Meta Platforms Inc.", 
    price: 483.15, 
    change: -4.32, 
    changePercent: -0.89, 
    industry: "Technology",
    marketCap: "1.24T",
    pe: 28.4,
    dividendYield: 0.0,
    fiftyTwoWeekHigh: 523.45,
    fiftyTwoWeekLow: 350.87,
    avgVolume: 16543210
  },
  { 
    symbol: "BRK.A", 
    name: "Berkshire Hathaway Inc.", 
    price: 588423.0, 
    change: 1234.0, 
    changePercent: 0.21, 
    industry: "Financial Services",
    marketCap: "860.42B",
    pe: 10.2,
    dividendYield: 0.0,
    fiftyTwoWeekHigh: 600120.0,
    fiftyTwoWeekLow: 520450.0,
    avgVolume: 6543210
  },
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

const watchlistStocks = ["AAPL", "MSFT", "GOOGL"];

const StocksPage = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("1M");
  const [showCompare, setShowCompare] = useState(false);
  const [watchlist, setWatchlist] = useState(watchlistStocks);
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [showPositiveOnly, setShowPositiveOnly] = useState(false);

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
    // Simulate fetching stock details
    setTimeout(() => {
      toast.info(`${symbol} data updated`);
    }, 300);
  };

  const handleExportData = () => {
    toast.success("Stock data exported successfully");
  };

  const handleSetAlert = (stock: string) => {
    toast.success(`Price alert set for ${stock}`);
  };

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
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={stockPriceData} 
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
                    <Legend 
                      onClick={(e) => {
                        toast.info(`Toggled visibility of ${e.dataKey}`);
                      }}
                    />
                    <Line type="monotone" dataKey="AAPL" stroke="#0088FE" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="GOOGL" stroke="#00C49F" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="MSFT" stroke="#FFBB28" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="AMZN" stroke="#FF8042" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
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
                        <div className="col-span-2">
                          <div>{stock.name}</div>
                          <div className="text-xs text-muted-foreground">{stock.industry}</div>
                        </div>
                        <div className="text-right font-medium">${stock.price.toLocaleString()}</div>
                        <div className="text-right">
                          <div className={stock.changePercent >= 0 ? "text-green-600" : "text-red-500"}>
                            {stock.changePercent >= 0 ? (
                              <span className="inline-flex items-center">
                                <ArrowUp className="h-3 w-3 mr-0.5" />
                                {stock.changePercent.toFixed(2)}%
                              </span>
                            ) : (
                              <span className="inline-flex items-center">
                                <ArrowDown className="h-3 w-3 mr-0.5" />
                                {Math.abs(stock.changePercent).toFixed(2)}%
                              </span>
                            )}
                          </div>
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
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>
                        {selectedStock}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {trendingStocks.find(s => s.symbol === selectedStock)?.industry || "Technology"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {trendingStocks.find(s => s.symbol === selectedStock)?.name || "Apple Inc."}
                    </CardDescription>
                  </div>
                  <div className={trendingStocks.find(s => s.symbol === selectedStock)?.changePercent >= 0 ? 
                    "bg-green-50 text-green-700 px-2 py-1 rounded font-medium text-sm flex items-center" : 
                    "bg-red-50 text-red-700 px-2 py-1 rounded font-medium text-sm flex items-center"
                  }>
                    {trendingStocks.find(s => s.symbol === selectedStock)?.changePercent >= 0 ? (
                      <>
                        <ArrowUp className="h-3 w-3 mr-1" />
                        {trendingStocks.find(s => s.symbol === selectedStock)?.changePercent.toFixed(2)}%
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-3 w-3 mr-1" />
                        {Math.abs(trendingStocks.find(s => s.symbol === selectedStock)?.changePercent || 0).toFixed(2)}%
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StockDetailCard 
                  stock={trendingStocks.find(s => s.symbol === selectedStock) || trendingStocks[0]} 
                  onSetAlert={handleSetAlert}
                  onAddToPortfolio={(stock) => {
                    toast.success(`${stock} added to your portfolio`);
                  }}
                  onViewDetails={(stock) => {
                    toast.info(`Viewing detailed analysis for ${stock}`);
                  }}
                  isInWatchlist={watchlist.includes(selectedStock)}
                  onToggleWatchlist={toggleWatchlist}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Market News Section */}
          <div className="mb-6">
            <MarketNews />
          </div>
          
          {/* Additional Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Trading Volume</CardTitle>
                  <CardDescription>Daily trading volume comparison</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0" 
                  onClick={() => toast.info("Volume data can help identify market interest in a stock")}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={volumeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      onClick={(data) => {
                        if (data && data.activePayload) {
                          const stock = data.activePayload[0].payload.name;
                          toast.info(`${stock} volume: ${data.activePayload[0].payload.volume.toLocaleString()}`);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Volume']} />
                      <Bar dataKey="volume" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Quarterly Performance</CardTitle>
                  <CardDescription>Earnings per share (EPS) growth</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toast.info("EPS data updated with latest quarterly results")}
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Quarterly
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={comparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      onClick={(data) => {
                        if (data && data.activePayload) {
                          const quarter = data.activePayload[0].payload.date;
                          toast.info(`Selected data from ${quarter}`);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'EPS']} />
                      <Legend />
                      <Area type="monotone" dataKey="AAPL" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="MSFT" stackId="2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="GOOGL" stackId="3" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="AMZN" stackId="4" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StocksPage;
