
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, BarChart3, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const { toast } = useToast();

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuthDialog(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthDialog(true);
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Trade Journaling",
      description: "Document your trades with notes, screenshots, and strategy tags for better analysis."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Performance Analytics",
      description: "Track your P&L, win rate, and trading patterns with intuitive charts and metrics."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "CSV Import",
      description: "Import trades directly from MetaTrader and TradingView for seamless data management."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your trading data is protected with enterprise-grade security and encryption."
    }
  ];

  const benefits = [
    "Identify profitable trading patterns",
    "Reduce emotional trading decisions",
    "Track performance over time",
    "Learn from past mistakes",
    "Improve risk management",
    "Build trading discipline"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TradeJournal Pro</span>
            </div>
            <Button variant="outline" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            7-Day Free Trial Available
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your Trading
            <span className="text-blue-600 block">Performance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The professional forex trading journal that helps you analyze trades, 
            track performance, and develop winning strategies through data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for forex traders to improve their performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Trading Results
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of traders who have improved their performance using our comprehensive journaling system.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$29</div>
                <div className="text-blue-100 mb-6">per month</div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Unlimited trade entries</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>CSV import/export</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Cloud storage</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  onClick={handleGetStarted}
                >
                  Start 7-Day Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your free trial today and discover how professional trade journaling can transform your results.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleGetStarted}
          >
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Auth Dialog */}
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
