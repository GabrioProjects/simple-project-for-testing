
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
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Trades = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock trades data
  const trades = [
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
      pair: "USD/JPY",
      type: "BUY",
      lotSize: 0.1,
      entryPrice: 157.25,
      exitPrice: null,
      pnl: 45.30,
      status: "Open",
      strategy: "Breakout",
      notes: "Monitoring for continuation"
    }
  ];

  const filteredTrades = trades.filter(trade =>
    trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.strategy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout currentPage="Trades">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search trades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/trades/new')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Trade
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trades.length}</div>
              <div className="text-xs text-gray-500">This month</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Winning Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {trades.filter(t => t.pnl > 0).length}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((trades.filter(t => t.pnl > 0).length / trades.length) * 100)}% win rate
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${trades.reduce((sum, trade) => sum + trade.pnl, 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">All time</div>
            </CardContent>
          </Card>
        </div>

        {/* Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Trades</CardTitle>
            <CardDescription>
              Manage and review your trading history
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
                  <TableHead>Status</TableHead>
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
                    <TableCell>{trade.exitPrice || '-'}</TableCell>
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
                    <TableCell>
                      <Badge variant={trade.status === 'Open' ? 'default' : 'secondary'}>
                        {trade.status}
                      </Badge>
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
