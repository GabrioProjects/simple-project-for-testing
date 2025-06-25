
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, Award } from "lucide-react";

const Statistics = () => {
  // Mock data for comprehensive statistics
  const allTrades = [
    { id: 1, date: "2024-06-24", pair: "EUR/USD", type: "BUY", lotSize: 0.1, pnl: 125.50, strategy: "Breakout" },
    { id: 2, date: "2024-06-23", pair: "GBP/JPY", type: "SELL", lotSize: 0.05, pnl: -45.20, strategy: "Reversal" },
    { id: 3, date: "2024-06-22", pair: "USD/CAD", type: "BUY", lotSize: 0.2, pnl: 89.75, strategy: "Trend Following" },
    { id: 4, date: "2024-06-21", pair: "AUD/USD", type: "SELL", lotSize: 0.15, pnl: 156.80, strategy: "Support/Resistance" },
    { id: 5, date: "2024-06-20", pair: "USD/CHF", type: "BUY", lotSize: 0.08, pnl: -67.40, strategy: "Breakout" },
    { id: 6, date: "2024-06-19", pair: "EUR/GBP", type: "SELL", lotSize: 0.12, pnl: 98.20, strategy: "Reversal" },
    { id: 7, date: "2024-06-18", pair: "GBP/USD", type: "BUY", lotSize: 0.1, pnl: -23.50, strategy: "Trend Following" },
    { id: 8, date: "2024-06-17", pair: "USD/JPY", type: "SELL", lotSize: 0.15, pnl: 78.90, strategy: "Support/Resistance" },
  ];

  // Calculate key metrics
  const totalTrades = allTrades.length;
  const winningTrades = allTrades.filter(t => t.pnl > 0);
  const losingTrades = allTrades.filter(t => t.pnl < 0);
  const winRate = (winningTrades.length / totalTrades) * 100;
  const totalPnL = allTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const avgWin = winningTrades.reduce((sum, trade) => sum + trade.pnl, 0) / winningTrades.length;
  const avgLoss = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.pnl, 0) / losingTrades.length);
  const profitFactor = (winningTrades.reduce((sum, trade) => sum + trade.pnl, 0)) / Math.abs(losingTrades.reduce((sum, trade) => sum + trade.pnl, 0));
  const largestWin = Math.max(...allTrades.map(t => t.pnl));
  const largestLoss = Math.min(...allTrades.map(t => t.pnl));

  // Monthly performance data
  const monthlyData = [
    { month: 'Jan', pnl: 245.30, trades: 12 },
    { month: 'Feb', pnl: -89.40, trades: 8 },
    { month: 'Mar', pnl: 456.20, trades: 15 },
    { month: 'Apr', pnl: 123.80, trades: 10 },
    { month: 'May', pnl: 334.60, trades: 14 },
    { month: 'Jun', pnl: totalPnL, trades: totalTrades },
  ];

  // Strategy performance
  const strategyStats = allTrades.reduce((acc, trade) => {
    if (!acc[trade.strategy]) {
      acc[trade.strategy] = { trades: 0, pnl: 0, wins: 0 };
    }
    acc[trade.strategy].trades += 1;
    acc[trade.strategy].pnl += trade.pnl;
    if (trade.pnl > 0) acc[trade.strategy].wins += 1;
    return acc;
  }, {} as Record<string, { trades: number; pnl: number; wins: number }>);

  const strategyData = Object.entries(strategyStats).map(([strategy, stats]) => ({
    strategy,
    ...stats,
    winRate: (stats.wins / stats.trades) * 100
  }));

  // Currency pair performance
  const pairStats = allTrades.reduce((acc, trade) => {
    if (!acc[trade.pair]) {
      acc[trade.pair] = { trades: 0, pnl: 0 };
    }
    acc[trade.pair].trades += 1;
    acc[trade.pair].pnl += trade.pnl;
    return acc;
  }, {} as Record<string, { trades: number; pnl: number }>);

  const pairData = Object.entries(pairStats).map(([pair, stats]) => ({
    pair,
    ...stats
  })).sort((a, b) => b.pnl - a.pnl);

  // Trade type distribution
  const tradeTypeData = [
    { name: 'BUY', value: allTrades.filter(t => t.type === 'BUY').length, fill: '#22c55e' },
    { name: 'SELL', value: allTrades.filter(t => t.type === 'SELL').length, fill: '#ef4444' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <DashboardLayout currentPage="Statistics">
      <div className="space-y-6">
        {/* Key Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalPnL.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">All time performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">{winningTrades.length} of {totalTrades} trades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profitFactor.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Gross profit / Gross loss</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTrades}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Win</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">${avgWin.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600">${avgLoss.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Largest Win</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">${largestWin.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Largest Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600">${Math.abs(largestLoss).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly P&L</CardTitle>
              <CardDescription>Performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pnl" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trade Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Type Distribution</CardTitle>
              <CardDescription>BUY vs SELL trades</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tradeTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tradeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Strategy Performance</CardTitle>
            <CardDescription>Analysis by trading strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Strategy</TableHead>
                  <TableHead className="text-right">Trades</TableHead>
                  <TableHead className="text-right">Win Rate</TableHead>
                  <TableHead className="text-right">Total P&L</TableHead>
                  <TableHead className="text-right">Avg P&L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategyData.map((strategy) => (
                  <TableRow key={strategy.strategy}>
                    <TableCell className="font-medium">{strategy.strategy}</TableCell>
                    <TableCell className="text-right">{strategy.trades}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={strategy.winRate >= 50 ? "default" : "secondary"}>
                        {strategy.winRate.toFixed(0)}%
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right ${strategy.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${strategy.pnl.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-right ${(strategy.pnl / strategy.trades) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${(strategy.pnl / strategy.trades).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Currency Pair Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Currency Pair Performance</CardTitle>
            <CardDescription>P&L by currency pair</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead className="text-right">Trades</TableHead>
                  <TableHead className="text-right">Total P&L</TableHead>
                  <TableHead className="text-right">Avg P&L</TableHead>
                  <TableHead className="text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pairData.map((pair) => (
                  <TableRow key={pair.pair}>
                    <TableCell className="font-medium">{pair.pair}</TableCell>
                    <TableCell className="text-right">{pair.trades}</TableCell>
                    <TableCell className={`text-right ${pair.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${pair.pnl.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-right ${(pair.pnl / pair.trades) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${(pair.pnl / pair.trades).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {pair.pnl >= 0 ? (
                        <TrendingUp className="inline h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="inline h-4 w-4 text-red-600" />
                      )}
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

export default Statistics;
