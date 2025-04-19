
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const lossMakingAssets = [
  { id: "tsla", name: "Tesla Inc (TSLA)", loss: -1420.50, shares: 7, price: 227.22 },
  { id: "meta", name: "Meta Platforms (META)", loss: -850.30, shares: 4, price: 483.15 },
  { id: "coin", name: "Coinbase (COIN)", loss: -675.25, shares: 12, price: 177.60 },
  { id: "amd", name: "AMD Inc (AMD)", loss: -425.80, shares: 10, price: 162.75 },
];

const TaxLossHarvesting = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  
  const totalLoss = lossMakingAssets
    .filter(asset => selectedAssets.includes(asset.id))
    .reduce((sum, asset) => sum + asset.loss, 0);
  
  const toggleAsset = (id: string) => {
    if (selectedAssets.includes(id)) {
      setSelectedAssets(selectedAssets.filter(assetId => assetId !== id));
    } else {
      setSelectedAssets([...selectedAssets, id]);
    }
  };
  
  const handleHarvest = () => {
    if (selectedAssets.length === 0) {
      toast.error("Please select at least one asset to harvest losses");
      return;
    }
    
    const assetNames = lossMakingAssets
      .filter(asset => selectedAssets.includes(asset.id))
      .map(asset => asset.name)
      .join(", ");
    
    toast.success(`Tax loss harvesting applied to: ${assetNames}`);
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Select underperforming assets to harvest losses and offset capital gains tax liability.
        </p>
      </div>
      
      <div className="space-y-4">
        {lossMakingAssets.map((asset) => (
          <div 
            key={asset.id} 
            className="flex items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm"
            onClick={() => toggleAsset(asset.id)}
          >
            <Checkbox
              id={asset.id}
              checked={selectedAssets.includes(asset.id)}
              onCheckedChange={() => toggleAsset(asset.id)}
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor={asset.id} className="font-medium">{asset.name}</Label>
              <div className="flex justify-between text-sm">
                <div className="text-muted-foreground">
                  {asset.shares} shares at ${asset.price}
                </div>
                <div className="text-red-600 font-medium">
                  ${asset.loss.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedAssets.length > 0 && (
        <div className="bg-slate-50 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Loss to Harvest</span>
            <span className="text-red-600 font-bold">${totalLoss.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Estimated tax savings: ${Math.abs(totalLoss * 0.20).toFixed(2)} (assuming 20% capital gains tax)
          </p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleHarvest}>Harvest Losses</Button>
      </div>
    </div>
  );
};

export default TaxLossHarvesting;
