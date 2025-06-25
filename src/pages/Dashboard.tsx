import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  Plus,
  Upload,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for charts
  const pnlData = [
    { date: '2024-01', pnl: 1200 },
    { date: '2024-02', pnl: 1800 },
    { date: '2024-03', pnl: 1500 },
    { date: '2024-04', pnl: 2200 },
    { date: '2024-05', pnl: 3100 },
    { date: '2024-06', pnl: 2800 },
  ];

  const winLossData = [
    { name: 'Wins', value: 68, color: '#10b981' },
    { name: 'Losses', value: 32, color: '#ef4444' },
  ];

  const monthlyTradesData = [
    { month: 'Jan', trades: 24 },
    { month: 'Feb', trades: 31 },
    { month: 'Mar', trades: 28 },
    { month: 'Apr', trades: 35 },
    { month: 'May', trades: 42 },
    { month: 'Jun', trades: 38 },
  ];

  const metrics = [
    {
      title: "Total P&L",
      value: "$12,650",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Avg Win",
      value: "$185",
      change: "+12.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Avg Loss",
      value: "$95",
      change: "-5.2%",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-600"
    }
  ];

  return (
    <DashboardLayout currentPage="Dashboard">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/trades/new')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Trade
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/import')}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/trades')}
          >
            <FileText className="mr-2 h-4 w-4" />
            View All Trades
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-xs ${metric.color} flex items-center`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {metric.change} from last month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* P&L Chart */}
          <Card>
            <CardHeader>
              <CardTitle>P&L Over Time</CardTitle>
              <CardDescription>
                Your trading performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pnlData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'P&L']} />
                  <Line 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Win/Loss Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Distribution</CardTitle>
              <CardDescription>
                Overall performance breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Monthly Trades */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Trade Volume</CardTitle>
              <CardDescription>
                Number of trades executed each month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyTradesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="trades" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trial Status */}
          <Card>
            <CardHeader>
              <CardTitle>Free Trial Status</CardTitle>
              <CardDescription>
                Your trial expires in 5 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Days Used</span>
                  <span>2 of 7</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/subscription')}
              >
                Upgrade to Pro
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Unlock unlimited trades and advanced analytics
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest trading activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Added trade", pair: "EUR/USD", pnl: "+$125", time: "2 hours ago" },
                { action: "Added trade", pair: "GBP/JPY", pnl: "-$45", time: "5 hours ago" },
                { action: "Imported CSV", pair: "MT4 Export", pnl: "", time: "1 day ago" },
                { action: "Added trade", pair: "USD/CAD", pnl: "+$89", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.pair}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.pnl && (
                      <p className={`text-sm font-medium ${
                        activity.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.pnl}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
