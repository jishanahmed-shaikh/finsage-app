
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const currentAllocation = {
  stocks: 65,
  bonds: 20,
  cash: 10,
  alternatives: 5
};

const targetAllocation = {
  stocks: 55,
  bonds: 30,
  cash: 10,
  alternatives: 5
};

const RebalancePortfolio = () => {
  const [newAllocation, setNewAllocation] = useState({
    stocks: currentAllocation.stocks,
    bonds: currentAllocation.bonds,
    cash: currentAllocation.cash,
    alternatives: currentAllocation.alternatives
  });
  
  const handleStocksChange = (value: number[]) => {
    const stocksValue = value[0];
    const remaining = 100 - stocksValue - newAllocation.bonds - newAllocation.cash;
    
    setNewAllocation({
      ...newAllocation,
      stocks: stocksValue,
      alternatives: Math.max(0, remaining)
    });
  };
  
  const handleBondsChange = (value: number[]) => {
    const bondsValue = value[0];
    const remaining = 100 - newAllocation.stocks - bondsValue - newAllocation.cash;
    
    setNewAllocation({
      ...newAllocation,
      bonds: bondsValue,
      alternatives: Math.max(0, remaining)
    });
  };
  
  const handleCashChange = (value: number[]) => {
    const cashValue = value[0];
    const remaining = 100 - newAllocation.stocks - newAllocation.bonds - cashValue;
    
    setNewAllocation({
      ...newAllocation,
      cash: cashValue,
      alternatives: Math.max(0, remaining)
    });
  };
  
  const handleRebalance = () => {
    // Check if allocations add up to 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    
    if (Math.abs(total - 100) > 0.01) {
      toast.error("Allocations must add up to 100%");
      return;
    }
    
    toast.success("Portfolio rebalanced successfully!");
  };
  
  const resetToTarget = () => {
    setNewAllocation(targetAllocation);
    toast.info("Reset to recommended allocation");
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Your current allocation is out of balance with your risk profile. Adjust the sliders below to rebalance.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Stocks</Label>
            <span className="text-sm font-medium">{newAllocation.stocks}%</span>
          </div>
          <Slider
            value={[newAllocation.stocks]}
            max={80}
            step={1}
            onValueChange={handleStocksChange}
          />
          <p className="text-xs text-muted-foreground">Recommended: {targetAllocation.stocks}%</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Bonds</Label>
            <span className="text-sm font-medium">{newAllocation.bonds}%</span>
          </div>
          <Slider
            value={[newAllocation.bonds]}
            max={50}
            step={1}
            onValueChange={handleBondsChange}
          />
          <p className="text-xs text-muted-foreground">Recommended: {targetAllocation.bonds}%</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Cash</Label>
            <span className="text-sm font-medium">{newAllocation.cash}%</span>
          </div>
          <Slider
            value={[newAllocation.cash]}
            max={30}
            step={1}
            onValueChange={handleCashChange}
          />
          <p className="text-xs text-muted-foreground">Recommended: {targetAllocation.cash}%</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Alternatives</Label>
            <span className="text-sm font-medium">{newAllocation.alternatives}%</span>
          </div>
          <div className="h-4 w-full relative rounded-full overflow-hidden bg-slate-100">
            <div className="h-full bg-slate-300" style={{ width: `${newAllocation.alternatives}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground">Recommended: {targetAllocation.alternatives}%</p>
        </div>
      </div>
      
      <div className="flex justify-between space-x-3">
        <Button variant="outline" onClick={resetToTarget}>Use Recommended</Button>
        <Button onClick={handleRebalance}>Rebalance Portfolio</Button>
      </div>
    </div>
  );
};

export default RebalancePortfolio;
