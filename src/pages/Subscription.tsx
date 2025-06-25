
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Shield,
  BarChart3,
  FileText,
  Upload,
  Crown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Started",
      description: "Redirecting to secure payment portal...",
    });
  };

  const handleManageBilling = () => {
    toast({
      title: "Billing Portal",
      description: "Opening billing management portal...",
    });
  };

  const features = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Unlimited Trade Entries",
      description: "Record as many trades as you need"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Advanced Analytics",
      description: "Detailed performance insights and trends"
    },
    {
      icon: <Upload className="h-5 w-5" />,
      title: "CSV Import/Export",
      description: "Import from MT4, TradingView, and more"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Cloud Storage",
      description: "Secure backup of all your data"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Performance Reports",
      description: "Weekly and monthly performance summaries"
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Priority Support",
      description: "Fast response to your questions"
    }
  ];

  return (
    <DashboardLayout currentPage="Subscription">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Subscription Management</h1>
          <p className="text-gray-600">
            Manage your TradeJournal Pro subscription and billing
          </p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Free Trial</h3>
                <p className="text-gray-600">7-day trial period</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Trial
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Trial Progress</span>
                  <span>2 of 7 days used</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>

              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <p className="text-gray-500">Trial Started</p>
                  <p className="font-medium">June 23, 2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Trial Ends</p>
                  <p className="font-medium">June 30, 2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Auto-renewal</p>
                  <p className="font-medium">Disabled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Plan */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-blue-600" />
              TradeJournal Pro
            </CardTitle>
            <CardDescription>
              Unlock the full potential of your trading journal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">$29</div>
                <div className="text-gray-600">per month</div>
                <div className="text-sm text-gray-500 mt-1">billed monthly</div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-3">
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpgrade}
                >
                  Upgrade to Pro
                </Button>
                <p className="text-xs text-gray-500">
                  Cancel anytime • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Trial Usage</CardTitle>
            <CardDescription>
              See how you're using your trial period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Trades Recorded</div>
                <div className="text-xs text-gray-500 mt-1">No limit with Pro</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">CSV Imports</div>
                <div className="text-xs text-gray-500 mt-1">Unlimited with Pro</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Screenshots Uploaded</div>
                <div className="text-xs text-gray-500 mt-1">10GB storage with Pro</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No billing history yet</p>
              <p className="text-sm">Your billing history will appear here after upgrade</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">What happens to my data if I cancel?</h4>
              <p className="text-sm text-gray-600">
                Your data remains secure for 30 days after cancellation. You can export your data at any time before permanent deletion.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Do you offer refunds?</h4>
              <p className="text-sm text-gray-600">
                We offer a 30-day money-back guarantee for your first subscription payment. Contact support for assistance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Can I upgrade or downgrade my plan?</h4>
              <p className="text-sm text-gray-600">
                Currently we offer one comprehensive Pro plan. We're working on additional tiers based on user feedback.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
