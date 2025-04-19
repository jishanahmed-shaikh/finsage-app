
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change?: number;
  changePercent?: number;
  industry?: string;
  marketCap?: string;
}

interface AddToPortfolioProps {
  stock: Stock;
  onSubmit: () => void;
}

const AddToPortfolio = ({ stock, onSubmit }: AddToPortfolioProps) => {
  const [quantity, setQuantity] = useState<string>("10");
  const [orderType, setOrderType] = useState<string>("market");
  const [limitPrice, setLimitPrice] = useState<string>(stock.price.toString());
  
  const handleSubmit = () => {
    const qty = parseInt(quantity);
    
    if (isNaN(qty) || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    
    if (orderType === "limit") {
      const price = parseFloat(limitPrice);
      
      if (isNaN(price) || price <= 0) {
        toast.error("Please enter a valid limit price");
        return;
      }
    }
    
    // Submit the order (mock)
    const totalCost = qty * stock.price;
    
    toast.success(
      `Added ${qty} shares of ${stock.symbol} to your portfolio for $${totalCost.toLocaleString()}`
    );
    
    onSubmit();
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{stock.symbol} - {stock.name}</p>
          <p className="text-2xl font-bold">${stock.price.toLocaleString()}</p>
        </div>
        <div className="bg-primary-50 px-3 py-2 rounded-md">
          <p className="text-sm text-muted-foreground">Estimated Cost</p>
          <p className="text-lg font-bold text-primary-700">
            ${(parseFloat(quantity) * stock.price || 0).toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Order Type</Label>
          <RadioGroup value={orderType} onValueChange={setOrderType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="market" id="market" />
              <Label htmlFor="market">Market Order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limit" id="limit" />
              <Label htmlFor="limit">Limit Order</Label>
            </div>
          </RadioGroup>
        </div>
        
        {orderType === "limit" && (
          <div className="space-y-2">
            <Label htmlFor="limitPrice">Limit Price ($)</Label>
            <Input
              id="limitPrice"
              type="number"
              min="0.01"
              step="0.01"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your order will only execute at this price or better
            </p>
          </div>
        )}
      </div>
      
      <div className="pt-2 space-y-3">
        <Button onClick={handleSubmit} className="w-full">
          Add to Portfolio
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          This is a simulated transaction. No real purchases will be made.
        </p>
      </div>
    </div>
  );
};

export default AddToPortfolio;
