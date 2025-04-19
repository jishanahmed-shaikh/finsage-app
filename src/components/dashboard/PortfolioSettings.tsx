
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { AlertTriangle, Info, ArrowRight, PieChart, BarChart, RefreshCw } from "lucide-react";

const fixedIncomeOptions = [
  { id: "corporate", name: "Corporate Bonds", risk: "Medium", yield: "4-6%" },
  { id: "treasury", name: "Treasury Bonds", risk: "Low", yield: "2-3%" },
  { id: "municipal", name: "Municipal Bonds", risk: "Low-Medium", yield: "3-4%" },
  { id: "high-yield", name: "High Yield Bonds", risk: "High", yield: "6-8%" }
];

const equityOptions = [
  { id: "us-large", name: "US Large Cap", risk: "Medium", potential: "7-10%" },
  { id: "us-small", name: "US Small Cap", risk: "High", potential: "8-12%" },
  { id: "international", name: "International Developed", risk: "Medium-High", potential: "6-9%" },
  { id: "emerging", name: "Emerging Markets", risk: "High", potential: "8-14%" }
];

const alternativeOptions = [
  { id: "real-estate", name: "Real Estate", risk: "Medium", potential: "5-8%" },
  { id: "commodities", name: "Commodities", risk: "High", potential: "Variable" },
  { id: "hedge-funds", name: "Hedge Funds", risk: "Medium-High", potential: "6-10%" },
  { id: "private-equity", name: "Private Equity", risk: "Very High", potential: "10-15%" }
];

const PortfolioSettings = () => {
  const [activeTab, setActiveTab] = useState("fixed-income");
  const [selectedFixedIncome, setSelectedFixedIncome] = useState("corporate");
  const [fixedIncomeAllocation, setFixedIncomeAllocation] = useState([25]);
  
  const [selectedEquity, setSelectedEquity] = useState("us-large");
  const [equityAllocation, setEquityAllocation] = useState([40]);
  
  const [selectedAlternative, setSelectedAlternative] = useState("real-estate");
  const [alternativeAllocation, setAlternativeAllocation] = useState([10]);
  
  const [autoRebalance, setAutoRebalance] = useState(false);
  const [diversificationWarning, setDiversificationWarning] = useState(false);
  
  const cashAllocation = 100 - (fixedIncomeAllocation[0] + equityAllocation[0] + alternativeAllocation[0]);
  
  // Check for diversification warning
  React.useEffect(() => {
    const checkDiversification = () => {
      if (
        fixedIncomeAllocation[0] > 50 || 
        equityAllocation[0] > 65 || 
        alternativeAllocation[0] > 25 ||
        cashAllocation < 0
      ) {
        setDiversificationWarning(true);
      } else {
        setDiversificationWarning(false);
      }
    };
    
    checkDiversification();
  }, [fixedIncomeAllocation, equityAllocation, alternativeAllocation, cashAllocation]);
  
  const handleSave = () => {
    if (cashAllocation < 0) {
      toast.error("Total allocation exceeds 100%. Please adjust your allocations.");
      return;
    }
    
    toast.success("Portfolio settings updated successfully!");
    
    // Show different toast based on selections
    if (selectedFixedIncome === "high-yield" && fixedIncomeAllocation[0] > 30) {
      toast.warning("Note: Your high-yield bond allocation is relatively high. Consider your risk tolerance.");
    }
    
    if (selectedEquity === "emerging" && equityAllocation[0] > 25) {
      toast.warning("Note: Your emerging markets allocation is relatively high. Consider your risk tolerance.");
    }
    
    if (autoRebalance) {
      toast.info("Auto-rebalancing is enabled. Your portfolio will be rebalanced quarterly.");
    }
  };
  
  const handleReset = () => {
    setSelectedFixedIncome("corporate");
    setFixedIncomeAllocation([25]);
    setSelectedEquity("us-large");
    setEquityAllocation([40]);
    setSelectedAlternative("real-estate");
    setAlternativeAllocation([10]);
    setAutoRebalance(false);
    toast.info("Portfolio settings reset to default values.");
  };
  
  const recommendFixedIncome = () => {
    setSelectedFixedIncome("municipal");
    setFixedIncomeAllocation([30]);
    toast.success("Applied recommended fixed income settings!");
  };
  
  const recommendEquity = () => {
    setSelectedEquity("us-large");
    setEquityAllocation([45]);
    toast.success("Applied recommended equity settings!");
  };
  
  const recommendAlternative = () => {
    setSelectedAlternative("real-estate");
    setAlternativeAllocation([15]);
    toast.success("Applied recommended alternative settings!");
  };
  
  return (
    <div className="space-y-6 py-4">
      <Tabs defaultValue="fixed-income" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="fixed-income" className="flex-1">Fixed Income</TabsTrigger>
          <TabsTrigger value="equity" className="flex-1">Equity</TabsTrigger>
          <TabsTrigger value="alternatives" className="flex-1">Alternatives</TabsTrigger>
          <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fixed-income" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Select Fixed Income Type</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs"
              onClick={recommendFixedIncome}
            >
              <Info className="h-3 w-3" />
              Recommend
            </Button>
          </div>
          
          <RadioGroup defaultValue={selectedFixedIncome} value={selectedFixedIncome} onValueChange={setSelectedFixedIncome}>
            {fixedIncomeOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-primary-50 transition-colors cursor-pointer">
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-muted-foreground">Risk: {option.risk}</span>
                    <span className="text-muted-foreground">Yield: {option.yield}</span>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Fixed Income Allocation</Label>
              <span className="text-sm font-medium">{fixedIncomeAllocation}%</span>
            </div>
            <Slider
              value={fixedIncomeAllocation}
              max={70}
              step={1}
              onValueChange={setFixedIncomeAllocation}
            />
            <p className="text-xs text-muted-foreground">Recommended allocation: 20-30%</p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="flex items-center gap-1"
              onClick={() => setActiveTab("equity")}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="equity" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Select Equity Type</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs"
              onClick={recommendEquity}
            >
              <Info className="h-3 w-3" />
              Recommend
            </Button>
          </div>
          
          <RadioGroup defaultValue={selectedEquity} value={selectedEquity} onValueChange={setSelectedEquity}>
            {equityOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-primary-50 transition-colors cursor-pointer">
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-muted-foreground">Risk: {option.risk}</span>
                    <span className="text-muted-foreground">Potential: {option.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Equity Allocation</Label>
              <span className="text-sm font-medium">{equityAllocation}%</span>
            </div>
            <Slider
              value={equityAllocation}
              max={70}
              step={1}
              onValueChange={setEquityAllocation}
            />
            <p className="text-xs text-muted-foreground">Recommended allocation: 40-60%</p>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("fixed-income")}
            >
              Back
            </Button>
            <Button 
              className="flex items-center gap-1"
              onClick={() => setActiveTab("alternatives")}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="alternatives" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Select Alternative Investment</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs"
              onClick={recommendAlternative}
            >
              <Info className="h-3 w-3" />
              Recommend
            </Button>
          </div>
          
          <RadioGroup defaultValue={selectedAlternative} value={selectedAlternative} onValueChange={setSelectedAlternative}>
            {alternativeOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-primary-50 transition-colors cursor-pointer">
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-muted-foreground">Risk: {option.risk}</span>
                    <span className="text-muted-foreground">Potential: {option.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Alternative Allocation</Label>
              <span className="text-sm font-medium">{alternativeAllocation}%</span>
            </div>
            <Slider
              value={alternativeAllocation}
              max={30}
              step={1}
              onValueChange={setAlternativeAllocation}
            />
            <p className="text-xs text-muted-foreground">Recommended allocation: 10-20%</p>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch 
              id="auto-rebalance" 
              checked={autoRebalance}
              onCheckedChange={setAutoRebalance}
            />
            <Label htmlFor="auto-rebalance">Enable quarterly auto-rebalancing</Label>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("equity")}
            >
              Back
            </Button>
            <Button 
              className="flex items-center gap-1"
              onClick={() => setActiveTab("summary")}
            >
              Review Summary <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-6">
          <h3 className="text-lg font-medium">Portfolio Allocation Summary</h3>
          
          {diversificationWarning && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Diversification Warning</p>
                <p className="text-xs text-amber-700">
                  Your current allocation may be too concentrated in certain asset classes. Consider a more balanced approach.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square bg-slate-50 rounded-lg p-4 flex items-center justify-center">
              <div className="w-48 h-48 relative">
                <PieChart className="w-full h-full text-slate-300" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-center space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-xs">Equity {equityAllocation}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-xs">Fixed Income {fixedIncomeAllocation}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs">Alternatives {alternativeAllocation}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span className="text-xs">Cash {cashAllocation}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Fixed Income</h4>
                <div className="p-3 bg-primary-50 rounded-md border border-primary-100">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{fixedIncomeOptions.find(o => o.id === selectedFixedIncome)?.name}</span>
                    <span className="text-sm">{fixedIncomeAllocation}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full">
                      Risk: {fixedIncomeOptions.find(o => o.id === selectedFixedIncome)?.risk}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full">
                      Yield: {fixedIncomeOptions.find(o => o.id === selectedFixedIncome)?.yield}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Equity</h4>
                <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{equityOptions.find(o => o.id === selectedEquity)?.name}</span>
                    <span className="text-sm">{equityAllocation}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                      Risk: {equityOptions.find(o => o.id === selectedEquity)?.risk}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                      Potential: {equityOptions.find(o => o.id === selectedEquity)?.potential}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Alternatives</h4>
                <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{alternativeOptions.find(o => o.id === selectedAlternative)?.name}</span>
                    <span className="text-sm">{alternativeAllocation}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      Risk: {alternativeOptions.find(o => o.id === selectedAlternative)?.risk}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      Potential: {alternativeOptions.find(o => o.id === selectedAlternative)?.potential}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Cash</h4>
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cash Reserve</span>
                    <span className="text-sm">{cashAllocation}%</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${autoRebalance ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  <span className="text-sm">Quarterly auto-rebalancing: {autoRebalance ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <div className="space-x-2">
              <Button 
                variant="outline"
                onClick={() => setActiveTab("alternatives")}
              >
                Back
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioSettings;
