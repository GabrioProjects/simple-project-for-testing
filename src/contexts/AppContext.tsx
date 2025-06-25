
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  language: 'en' | 'lt';
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'lt') => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    trades: 'Trades',
    statistics: 'Statistics',
    addTrade: 'Add Trade',
    importCsv: 'Import CSV',
    subscription: 'Subscription',
    settings: 'Settings',
    
    // Common
    search: 'Search',
    filters: 'Filters',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    totalBalance: 'Total Balance',
    monthlyPnl: 'Monthly P&L',
    winRate: 'Win Rate',
    totalTrades: 'Total Trades',
    
    // Trades
    closedTrades: 'Closed Trades',
    winningTrades: 'Winning Trades',
    allTime: 'All time',
    date: 'Date',
    pair: 'Pair',
    type: 'Type',
    size: 'Size',
    entry: 'Entry',
    exit: 'Exit',
    strategy: 'Strategy',
    
    // Settings
    appearance: 'Appearance',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    lithuanian: 'Lithuanian'
  },
  lt: {
    // Navigation
    dashboard: 'Valdymo skydas',
    trades: 'Sandoriai',
    statistics: 'Statistika',
    addTrade: 'Pridėti sandorį',
    importCsv: 'Importuoti CSV',
    subscription: 'Prenumerata',
    settings: 'Nustatymai',
    
    // Common
    search: 'Ieškoti',
    filters: 'Filtrai',
    save: 'Išsaugoti',
    cancel: 'Atšaukti',
    edit: 'Redaguoti',
    delete: 'Ištrinti',
    
    // Dashboard
    welcomeBack: 'Sveiki sugrįžę',
    totalBalance: 'Bendras balansas',
    monthlyPnl: 'Mėnesio P&L',
    winRate: 'Laimėjimų santykis',
    totalTrades: 'Viso sandorių',
    
    // Trades
    closedTrades: 'Uždaryti sandoriai',
    winningTrades: 'Pelningi sandoriai',
    allTime: 'Visų laikų',
    date: 'Data',
    pair: 'Pora',
    type: 'Tipas',
    size: 'Dydis',
    entry: 'Įėjimas',
    exit: 'Išėjimas',
    strategy: 'Strategija',
    
    // Settings
    appearance: 'Išvaizda',
    language: 'Kalba',
    theme: 'Tema',
    light: 'Šviesi',
    dark: 'Tamsi',
    english: 'Anglų',
    lithuanian: 'Lietuvių'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [language, setLanguageState] = useState<'en' | 'lt'>('en');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    const savedLanguage = localStorage.getItem('app-language') as 'en' | 'lt' | null;
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const setLanguage = (newLanguage: 'en' | 'lt') => {
    setLanguageState(newLanguage);
    localStorage.setItem('app-language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
