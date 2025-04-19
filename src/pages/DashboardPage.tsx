
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from "recharts";
import { Calculator, TrendingUp, Wallet, BarChart as BarChartIcon, Bell, Eye, EyeOff, ChevronRight, ArrowUpRight, ArrowDownRight, Briefcase, LineChart as LineChartIcon, PieChart as PieChartIcon, Plus, Trash, Settings, Download } from "lucide-react";
import { toast } from "sonner";
import PortfolioSettings from "@/components/dashboard/PortfolioSettings";
import RebalancePortfolio from "@/components/dashboard/RebalancePortfolio";
import TaxLossHarvesting from "@/components/dashboard/TaxLossHarvesting";

// Portfolio data
const portfolioData = [
  { name: "Stocks", value: 45 },
  { name: "Mutual Funds", value: 30 },
  { name: "Fixed Deposits", value: 15 },
  { name: "Gold", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const performanceData = [
  { name: "Jan", return: 3.2 },
  { name: "Feb", return: 2.1 },
  { name: "Mar", return: -1.5 },
  { name: "Apr", return: 4.3 },
  { name: "May", return: 2.8 },
  { name: "Jun", return: 1.2 },
];

const portfolioGrowthData = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 104500 },
  { month: "Mar", value: 109800 },
  { month: "Apr", value: 108200 },
  { month: "May", value: 112600 },
  { month: "Jun", value: 118000 },
  { month: "Jul", value: 124300 },
  { month: "Aug", value: 128900 },
  { month: "Sep", value: 135200 },
  { month: "Oct", value: 139800 },
  { month: "Nov", value: 142100 },
  { month: "Dec", value: 143500 },
];

// Extended data for all holdings
const allHoldings = [
  { name: "AAPL", change: 2.4, price: 182.52, shares: 10, value: 1825.20, sector: "Technology", avgCost: 165.70 },
  { name: "MSFT", change: 1.2, price: 415.32, shares: 5, value: 2076.60, sector: "Technology", avgCost: 380.45 },
  { name: "GOOGL", change: -0.8, price: 175.84, shares: 8, value: 1406.72, sector: "Technology", avgCost: 180.20 },
  { name: "AMZN", change: 3.5, price: 196.10, shares: 6, value: 1176.60, sector: "Consumer Cyclical", avgCost: 170.50 },
  { name: "NVDA", change: 4.2, price: 122.84, shares: 15, value: 1842.60, sector: "Technology", avgCost: 98.35 },
  { name: "TSLA", change: -1.5, price: 227.22, shares: 7, value: 1590.54, sector: "Automotive", avgCost: 240.10 },
  { name: "JPM", change: 0.8, price: 195.30, shares: 12, value: 2343.60, sector: "Financial Services", avgCost: 180.75 },
  { name: "V", change: 1.7, price: 278.45, shares: 8, value: 2227.60, sector: "Financial Services", avgCost: 250.20 },
  { name: "JNJ", change: -0.3, price: 151.20, shares: 10, value: 1512.00, sector: "Healthcare", avgCost: 155.50 },
  { name: "PG", change: 0.4, price: 164.80, shares: 15, value: 2472.00, sector: "Consumer Defensive", avgCost: 158.30 },
];

// Top 5 stocks for dashboard
const topStocks = allHoldings.slice(0, 5);

const recommendations = [
  {
    title: "Diversify Fixed Income",
    description: "Consider allocating to corporate bonds for higher yields.",
    action: "Explore Options",
    component: <PortfolioSettings />
  },
  {
    title: "Rebalance Portfolio",
    description: "Your equity allocation is slightly higher than your risk profile.",
    action: "Rebalance",
    component: <RebalancePortfolio />
  },
  {
    title: "Tax-loss Harvesting",
    description: "Opportunity to offset gains with some underperforming assets.",
    action: "Review",
    component: <TaxLossHarvesting />
  }
];

const DashboardPage = () => {
  const [amount, setAmount] = useState<string>("10000");
  const [rate, setRate] = useState<string>("8");
  const [years, setYears] = useState<string>("5");
  const [result, setResult] = useState<number | null>(null);
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [showAllHoldings, setShowAllHoldings] = useState<boolean>(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);

  const calculateReturns = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    
    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      toast.error("Please enter valid numbers");
      return;
    }
    
    // Compound interest formula: A = P(1 + r)^t
    const futureValue = p * Math.pow(1 + r, t);
    setResult(futureValue);
    toast.success("Calculation completed successfully!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDownloadReport = () => {
    toast.success("Portfolio report downloaded successfully!");
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
            <Link to="/dashboard" className="text-foreground font-medium">Dashboard</Link>
            <Link to="/stocks" className="text-muted-foreground hover:text-foreground transition-colors">Analysis</Link>
            <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">Chat</Link>
            <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
            <Link to="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John! Here's your portfolio overview.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadReport}>
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Link to="/stocks">
                <Button className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Market Analysis
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-primary-50 to-primary-100/50 border-primary-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Portfolio Value</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">
                        {hideBalance ? "••••••" : formatCurrency(1435250)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-6 w-6"
                        onClick={() => setHideBalance(!hideBalance)}
                      >
                        {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    2.4%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1.5">this month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-secondary-50 to-secondary-100/50 border-secondary-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">YTD Return</p>
                    <p className="text-2xl font-bold">12.5%</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                    <LineChartIcon className="h-5 w-5 text-secondary-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    3.2%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1.5">vs benchmark</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-accent-50/50 to-accent-100/50 border-accent-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Dividend</p>
                    <p className="text-2xl font-bold">${8450}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-accent-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    5.7%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Risk Score</p>
                    <p className="text-2xl font-bold">7/10</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <PieChartIcon className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-muted-foreground">Moderately High</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Portfolio Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Portfolio Growth</CardTitle>
                  <CardDescription>12-month portfolio value trend</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("Chart settings can be customized here")}>
                  <Settings className="h-4 w-4 mr-1" /> Settings
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioGrowthData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis
                        tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0088FE" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        onClick={(data) => toast.info(`${data.name}: ${data.value}% of your portfolio`)}
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Holdings and Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Top Holdings</CardTitle>
                  <CardDescription>Your best performing stocks</CardDescription>
                </div>
                {!showAllHoldings && (
                  <Button variant="outline" size="sm" onClick={() => setShowAllHoldings(true)}>
                    View All
                  </Button>
                )}
                {showAllHoldings && (
                  <Button variant="outline" size="sm" onClick={() => setShowAllHoldings(false)}>
                    Show Less
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {(showAllHoldings ? allHoldings : topStocks).map((stock, index) => (
                    <div key={index} className="flex items-center py-3 border-b last:border-0">
                      <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 font-semibold">
                        {stock.name.substring(0, 2)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{stock.name}</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground">{stock.shares} shares</p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">{stock.sector}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${stock.value.toLocaleString()}</p>
                            <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2"
                        onClick={() => {
                          toast.info(`${stock.name}: Avg. cost $${stock.avgCost}`);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {!showAllHoldings && (
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowAllHoldings(true)}
                    >
                      View All Holdings
                    </Button>
                  </div>
                )}
                {showAllHoldings && (
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        toast.success("Portfolio data exported successfully");
                      }}
                    >
                      Export Data
                    </Button>
                    <Button 
                      variant="default"
                      onClick={() => {
                        toast.info("Add a new stock to your portfolio");
                      }}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Stock
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Returns Calculator</CardTitle>
                </div>
                <CardDescription>Calculate your potential investment returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Initial Investment ($)</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Annual Interest Rate (%)</label>
                    <Input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="8"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Time Period (years)</label>
                    <Input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="5"
                      min="1"
                    />
                  </div>
                  
                  <Button onClick={calculateReturns} className="w-full">Calculate</Button>
                  
                  {result !== null && (
                    <div className="mt-4 p-3 bg-primary-50 rounded-md border border-primary-100">
                      <p className="text-sm font-medium text-primary-700">Future Value</p>
                      <p className="text-xl font-bold">${result.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Returns: ${(result - parseFloat(amount)).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommendations */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((item, index) => (
                <Card key={index} className="border-primary-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto mt-2 text-primary-600"
                          onClick={() => setSelectedRecommendation(index)}
                        >
                          {item.action} →
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                        </DialogHeader>
                        {item.component}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
