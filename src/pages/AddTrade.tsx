
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Upload, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddTrade = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tradeData, setTradeData] = useState({
    date: new Date().toISOString().split('T')[0],
    pair: "",
    type: "",
    lotSize: "",
    entryPrice: "",
    exitPrice: "",
    stopLoss: "",
    takeProfit: "",
    strategy: "",
    notes: "",
    screenshot: null as File | null
  });

  const currencyPairs = [
    "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD",
    "NZD/USD", "EUR/GBP", "EUR/JPY", "GBP/JPY", "CHF/JPY", "AUD/JPY",
    "EUR/CHF", "EUR/AUD", "EUR/CAD", "GBP/CHF", "GBP/AUD", "AUD/CAD"
  ];

  const strategies = [
    "Breakout", "Reversal", "Trend Following", "Support/Resistance",
    "Scalping", "Swing Trading", "News Trading", "Grid Trading"
  ];

  const handleInputChange = (field: string, value: string) => {
    setTradeData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTradeData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!tradeData.pair || !tradeData.type || !tradeData.lotSize || !tradeData.entryPrice) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to your backend
    console.log("Trade data:", tradeData);
    
    toast({
      title: "Trade Added",
      description: "Your trade has been successfully recorded",
    });
    
    navigate('/trades');
  };

  return (
    <DashboardLayout currentPage="Add Trade">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/trades')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trades
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Trade</h1>
            <p className="text-gray-600">Record your trading activity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Trade Information */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Details</CardTitle>
              <CardDescription>
                Enter the basic information about your trade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={tradeData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pair">Currency Pair *</Label>
                  <Select value={tradeData.pair} onValueChange={(value) => handleInputChange('pair', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyPairs.map((pair) => (
                        <SelectItem key={pair} value={pair}>
                          {pair}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Trade Type *</Label>
                  <Select value={tradeData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size *</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    step="0.01"
                    placeholder="0.1"
                    value={tradeData.lotSize}
                    onChange={(e) => handleInputChange('lotSize', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Information */}
          <Card>
            <CardHeader>
              <CardTitle>Price Levels</CardTitle>
              <CardDescription>
                Enter entry, exit, and risk management levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="entryPrice">Entry Price *</Label>
                  <Input
                    id="entryPrice"
                    type="number"
                    step="0.00001"
                    placeholder="1.0795"
                    value={tradeData.entryPrice}
                    onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitPrice">Exit Price</Label>
                  <Input
                    id="exitPrice"
                    type="number"
                    step="0.00001"
                    placeholder="1.0825"
                    value={tradeData.exitPrice}
                    onChange={(e) => handleInputChange('exitPrice', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stopLoss">Stop Loss</Label>
                  <Input
                    id="stopLoss"
                    type="number"
                    step="0.00001"
                    placeholder="1.0780"
                    value={tradeData.stopLoss}
                    onChange={(e) => handleInputChange('stopLoss', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="takeProfit">Take Profit</Label>
                  <Input
                    id="takeProfit"
                    type="number"
                    step="0.00001"
                    placeholder="1.0840"
                    value={tradeData.takeProfit}
                    onChange={(e) => handleInputChange('takeProfit', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trade Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Analysis</CardTitle>
              <CardDescription>
                Document your strategy and reasoning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strategy">Strategy</Label>
                <Select value={tradeData.strategy} onValueChange={(value) => handleInputChange('strategy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    {strategies.map((strategy) => (
                      <SelectItem key={strategy} value={strategy}>
                        {strategy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Trade Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Describe your trade setup, market conditions, and reasoning..."
                  value={tradeData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot">Chart Screenshot</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="screenshot" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">
                        Upload a screenshot
                      </span>
                      <input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                  {tradeData.screenshot && (
                    <Badge className="mt-2">
                      {tradeData.screenshot.name}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Save Trade
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/trades')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddTrade;
