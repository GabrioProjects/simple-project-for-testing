import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Trades = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    pair: "",
    type: "",
    strategy: "",
    profitable: ""
  });

  // Mock closed trades data only
  const allTrades = [
    {
      id: 1,
      date: "2024-06-24",
      pair: "EUR/USD",
      type: "BUY",
      lotSize: 0.1,
      entryPrice: 1.0795,
      exitPrice: 1.0825,
      pnl: 125.50,
      status: "Closed",
      strategy: "Breakout",
      notes: "Good momentum trade"
    },
    {
      id: 2,
      date: "2024-06-23",
      pair: "GBP/JPY",
      type: "SELL",
      lotSize: 0.05,
      entryPrice: 158.45,
      exitPrice: 158.85,
      pnl: -45.20,
      status: "Closed",
      strategy: "Reversal",
      notes: "Stopped out early"
    },
    {
      id: 3,
      date: "2024-06-22",
      pair: "USD/CAD",
      type: "BUY",
      lotSize: 0.2,
      entryPrice: 1.3685,
      exitPrice: 1.3715,
      pnl: 89.75,
      status: "Closed",
      strategy: "Trend Following",
      notes: "Nice trend continuation"
    },
    {
      id: 4,
      date: "2024-06-21",
      pair: "AUD/USD",
      type: "SELL",
      lotSize: 0.15,
      entryPrice: 0.6745,
      exitPrice: 0.6725,
      pnl: 156.80,
      status: "Closed",
      strategy: "Support/Resistance",
      notes: "Perfect resistance rejection"
    },
    {
      id: 5,
      date: "2024-06-20",
      pair: "USD/CHF",
      type: "BUY",
      lotSize: 0.08,
      entryPrice: 0.8945,
      exitPrice: 0.8925,
      pnl: -67.40,
      status: "Closed",
      strategy: "Breakout",
      notes: "Failed breakout"
    },
    {
      id: 6,
      date: "2024-06-19",
      pair: "EUR/GBP",
      type: "SELL",
      lotSize: 0.12,
      entryPrice: 0.8465,
      exitPrice: 0.8445,
      pnl: 98.20,
      status: "Closed",
      strategy: "Reversal",
      notes: "Clean reversal signal"
    }
  ];

  // Enhanced search function - searches all attributes
  const filteredTrades = allTrades.filter(trade => {
    const searchMatch = searchTerm === "" || 
      trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.strategy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.date.includes(searchTerm) ||
      trade.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.entryPrice.toString().includes(searchTerm) ||
      trade.exitPrice.toString().includes(searchTerm) ||
      trade.pnl.toString().includes(searchTerm);

    const pairMatch = filters.pair === "" || trade.pair === filters.pair;
    const typeMatch = filters.type === "" || trade.type === filters.type;
    const strategyMatch = filters.strategy === "" || trade.strategy === filters.strategy;
    const profitableMatch = filters.profitable === "" || 
      (filters.profitable === "profitable" && trade.pnl > 0) ||
      (filters.profitable === "losing" && trade.pnl < 0);

    return searchMatch && pairMatch && typeMatch && strategyMatch && profitableMatch;
  });

  // Calculate stats for filtered trades
  const totalFilteredTrades = filteredTrades.length;
  const winningFilteredTrades = filteredTrades.filter(t => t.pnl > 0).length;
  const totalFilteredPnL = filteredTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winRateFiltered = totalFilteredTrades > 0 ? Math.round((winningFilteredTrades / totalFilteredTrades) * 100) : 0;

  const handleEditTrade = (tradeId: number) => {
    console.log(`Editing trade ${tradeId}`);
    navigate(`/trades/edit/${tradeId}`);
  };

  const handleDeleteTrade = (tradeId: number) => {
    console.log(`Deleting trade ${tradeId}`);
  };

  const clearFilters = () => {
    setFilters({
      pair: "",
      type: "",
      strategy: "",
      profitable: ""
    });
  };

  const uniquePairs = [...new Set(allTrades.map(trade => trade.pair))];
  const uniqueStrategies = [...new Set(allTrades.map(trade => trade.strategy))];

  return (
    <DashboardLayout currentPage="Trades">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search all trade data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {Object.values(filters).some(f => f !== "") && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      {Object.values(filters).filter(f => f !== "").length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="p-2">
                  <div className="mb-2">
                    <label className="text-sm font-medium">Currency Pair</label>
                    <select 
                      className="w-full mt-1 p-1 border rounded text-sm"
                      value={filters.pair}
                      onChange={(e) => setFilters({...filters, pair: e.target.value})}
                    >
                      <option value="">All Pairs</option>
                      {uniquePairs.map(pair => (
                        <option key={pair} value={pair}>{pair}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium">Trade Type</label>
                    <select 
                      className="w-full mt-1 p-1 border rounded text-sm"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                      <option value="">All Types</option>
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium">Strategy</label>
                    <select 
                      className="w-full mt-1 p-1 border rounded text-sm"
                      value={filters.strategy}
                      onChange={(e) => setFilters({...filters, strategy: e.target.value})}
                    >
                      <option value="">All Strategies</option>
                      {uniqueStrategies.map(strategy => (
                        <option key={strategy} value={strategy}>{strategy}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium">Profitability</label>
                    <select 
                      className="w-full mt-1 p-1 border rounded text-sm"
                      value={filters.profitable}
                      onChange={(e) => setFilters({...filters, profitable: e.target.value})}
                    >
                      <option value="">All Trades</option>
                      <option value="profitable">Profitable Only</option>
                      <option value="losing">Losing Only</option>
                    </select>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters}>
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/trades/new')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Trade
          </Button>
        </div>

        {/* Summary Cards - Updated to show filtered stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {(searchTerm || Object.values(filters).some(f => f !== "")) ? "Filtered Trades" : "Closed Trades"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFilteredTrades}</div>
              <div className="text-xs text-gray-500">
                {(searchTerm || Object.values(filters).some(f => f !== "")) ? `of ${allTrades.length} total` : "All time"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Winning Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {winningFilteredTrades}
              </div>
              <div className="text-xs text-gray-500">
                {winRateFiltered}% win rate
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalFilteredPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalFilteredPnL.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {(searchTerm || Object.values(filters).some(f => f !== "")) ? "Filtered results" : "All time"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        {(searchTerm || Object.values(filters).some(f => f !== "")) && (
          <div className="text-sm text-gray-600">
            Showing {filteredTrades.length} of {allTrades.length} trades
          </div>
        )}

        {/* Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Closed Trades</CardTitle>
            <CardDescription>
              All completed trades with final P&L
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell className="font-medium">{trade.pair}</TableCell>
                    <TableCell>
                      <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                        {trade.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.lotSize}</TableCell>
                    <TableCell>{trade.entryPrice}</TableCell>
                    <TableCell>{trade.exitPrice}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.pnl >= 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        ${Math.abs(trade.pnl).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>{trade.strategy}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTrade(trade.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteTrade(trade.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Trades;
