
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  TrendingUp,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  Plus,
  Upload,
  CreditCard,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export const DashboardLayout = ({ children, currentPage = 'Dashboard' }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useApp();

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: BarChart3, key: 'dashboard' },
    { name: t('trades'), href: '/trades', icon: FileText, key: 'trades' },
    { name: t('statistics'), href: '/statistics', icon: PieChart, key: 'statistics' },
    { name: t('addTrade'), href: '/trades/new', icon: Plus, key: 'addTrade' },
    { name: t('importCsv'), href: '/import', icon: Upload, key: 'importCsv' },
    { name: t('subscription'), href: '/subscription', icon: CreditCard, key: 'subscription' },
    { name: t('settings'), href: '/settings', icon: Settings, key: 'settings' },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-6 border-b">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold">TradeJournal Pro</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === currentPage;
          return (
            <Button
              key={item.key}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-blue-600 text-white"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-1">Free Trial</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">5 days remaining</p>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => handleNavigation('/subscription')}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 self-center">
                {currentPage}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('settings')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/subscription')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>{t('subscription')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
