
// Mock portfolio data for frontend testing

export const mockPortfolios = {
  'muser': {
    portfolioId: 'p1001',
    userId: 1,
    name: 'Growth Portfolio',
    totalValue: 253792.45,
    initialInvestment: 200000,
    createdAt: '2022-01-15',
    lastUpdated: '2023-04-04',
    currency: 'USD',
    riskScore: 7.2,
    performanceData: [
      { date: '2023-01-01', value: 220430.87 },
      { date: '2023-02-01', value: 228954.32 },
      { date: '2023-03-01', value: 235789.56 },
      { date: '2023-04-01', value: 248921.34 },
      { date: '2023-05-01', value: 244567.89 },
      { date: '2023-06-01', value: 250134.65 },
      { date: '2023-07-01', value: 253792.45 }
    ],
    assets: [
      {
        id: 'a1001',
        name: 'Apple Inc.',
        ticker: 'AAPL',
        type: 'stock',
        quantity: 100,
        purchasePrice: 150.25,
        currentPrice: 185.92,
        purchaseDate: '2022-02-10',
        currency: 'USD',
        value: 18592,
        allocation: 7.33
      },
      {
        id: 'a1002',
        name: 'Microsoft Corporation',
        ticker: 'MSFT',
        type: 'stock',
        quantity: 75,
        purchasePrice: 280.75,
        currentPrice: 325.93,
        purchaseDate: '2022-03-15',
        currency: 'USD',
        value: 24444.75,
        allocation: 9.63
      },
      {
        id: 'a1003',
        name: 'S&P 500 ETF',
        ticker: 'SPY',
        type: 'etf',
        quantity: 50,
        purchasePrice: 420.12,
        currentPrice: 457.89,
        purchaseDate: '2022-01-20',
        currency: 'USD',
        value: 22894.5,
        allocation: 9.02
      },
      {
        id: 'a1004',
        name: 'US Treasury Bond 2Y',
        ticker: 'UST2Y',
        type: 'bond',
        quantity: 25000,
        purchasePrice: 98.5,
        currentPrice: 99.2,
        purchaseDate: '2022-06-10',
        currency: 'USD',
        value: 24800,
        allocation: 9.77
      },
      {
        id: 'a1005',
        name: 'Bitcoin',
        ticker: 'BTC',
        type: 'crypto',
        quantity: 1.5,
        purchasePrice: 37500,
        currentPrice: 41275.83,
        purchaseDate: '2022-04-22',
        currency: 'USD',
        value: 61913.75,
        allocation: 24.4
      },
      {
        id: 'a1006',
        name: 'Residential Property',
        ticker: 'N/A',
        type: 'real_estate',
        quantity: 1,
        purchasePrice: 375000,
        currentPrice: 425000,
        purchaseDate: '2021-08-15',
        currency: 'USD',
        value: 425000,
        allocation: 16.75
      },
      {
        id: 'a1007',
        name: 'Gold',
        ticker: 'XAU',
        type: 'commodity',
        quantity: 10,
        purchasePrice: 1750,
        currentPrice: 1895.32,
        purchaseDate: '2022-05-18',
        currency: 'USD',
        value: 18953.2,
        allocation: 7.47
      },
      {
        id: 'a1008',
        name: 'EUR/USD',
        ticker: 'EUR/USD',
        type: 'forex',
        quantity: 25000,
        purchasePrice: 1.08,
        currentPrice: 1.12,
        purchaseDate: '2022-07-05',
        currency: 'USD',
        value: 28000,
        allocation: 11.03
      },
      {
        id: 'a1009',
        name: 'Ethereum',
        ticker: 'ETH',
        type: 'crypto',
        quantity: 5,
        purchasePrice: 2850,
        currentPrice: 2238.85,
        purchaseDate: '2022-03-30',
        currency: 'USD',
        value: 11194.25,
        allocation: 4.41
      }
    ],
    assetAllocation: {
      stock: 16.96,
      etf: 9.02,
      bond: 9.77,
      crypto: 28.81,
      real_estate: 16.75,
      commodity: 7.47,
      forex: 11.03
    },
    riskAnalysis: {
      volatility: 0.15,
      sharpeRatio: 1.2,
      drawdown: -0.08,
      var: -0.025,
      correlationMatrix: [
        [1, 0.7, 0.3, 0.2, 0.1, 0.4, 0.2],
        [0.7, 1, 0.4, 0.3, 0.2, 0.5, 0.3],
        [0.3, 0.4, 1, 0.1, 0.05, 0.2, 0.1],
        [0.2, 0.3, 0.1, 1, 0.4, 0.1, 0.2],
        [0.1, 0.2, 0.05, 0.4, 1, 0.1, 0.1],
        [0.4, 0.5, 0.2, 0.1, 0.1, 1, 0.3],
        [0.2, 0.3, 0.1, 0.2, 0.1, 0.3, 1]
      ]
    },
    recommendations: [
      {
        id: 'r1001',
        type: 'risk_alert',
        asset: 'Bitcoin',
        message: 'High crypto exposure may increase portfolio volatility',
        severity: 'medium',
        actionRequired: false
      },
      {
        id: 'r1002',
        type: 'investment_opportunity',
        asset: 'Corporate Bonds',
        message: 'Consider adding corporate bonds to diversify fixed income',
        severity: 'low',
        actionRequired: false
      },
      {
        id: 'r1003',
        type: 'rebalance',
        asset: 'Overall Portfolio',
        message: 'Portfolio drifted from target allocation, consider rebalancing',
        severity: 'medium',
        actionRequired: true
      }
    ]
  },
  
  'mvc': {
    portfolioId: 'p2001',
    userId: 2,
    name: 'Conservative Portfolio',
    totalValue: 542187.32,
    initialInvestment: 500000,
    createdAt: '2021-09-10',
    lastUpdated: '2023-04-04',
    currency: 'USD',
    riskScore: 4.5,
    performanceData: [
      { date: '2023-01-01', value: 510430.12 },
      { date: '2023-02-01', value: 518954.78 },
      { date: '2023-03-01', value: 525789.91 },
      { date: '2023-04-01', value: 528921.45 },
      { date: '2023-05-01', value: 534567.23 },
      { date: '2023-06-01', value: 540134.67 },
      { date: '2023-07-01', value: 542187.32 }
    ],
    assets: [
      {
        id: 'a2001',
        name: 'Vanguard Total Bond Market ETF',
        ticker: 'BND',
        type: 'etf',
        quantity: 1000,
        purchasePrice: 85.25,
        currentPrice: 87.92,
        purchaseDate: '2021-10-15',
        currency: 'USD',
        value: 87920,
        allocation: 16.22
      },
      {
        id: 'a2002',
        name: 'iShares Core S&P 500 ETF',
        ticker: 'IVV',
        type: 'etf',
        quantity: 200,
        purchasePrice: 380.75,
        currentPrice: 425.93,
        purchaseDate: '2021-11-20',
        currency: 'USD',
        value: 85186,
        allocation: 15.71
      },
      {
        id: 'a2003',
        name: 'US Treasury Bond 10Y',
        ticker: 'UST10Y',
        type: 'bond',
        quantity: 100000,
        purchasePrice: 99.1,
        currentPrice: 98.7,
        purchaseDate: '2022-01-10',
        currency: 'USD',
        value: 98700,
        allocation: 18.20
      },
      {
        id: 'a2004',
        name: 'Corporate Office Building',
        ticker: 'N/A',
        type: 'real_estate',
        quantity: 1,
        purchasePrice: 250000,
        currentPrice: 275000,
        purchaseDate: '2021-07-15',
        currency: 'USD',
        value: 275000,
        allocation: 50.72
      },
      {
        id: 'a2005',
        name: 'Gold ETF',
        ticker: 'GLD',
        type: 'commodity',
        quantity: 300,
        purchasePrice: 160.5,
        currentPrice: 168.32,
        purchaseDate: '2022-02-18',
        currency: 'USD',
        value: 50496,
        allocation: 9.31
      }
    ],
    assetAllocation: {
      etf: 31.93,
      bond: 18.20,
      real_estate: 50.72,
      commodity: 9.31
    },
    riskAnalysis: {
      volatility: 0.08,
      sharpeRatio: 0.9,
      drawdown: -0.05,
      var: -0.015,
      correlationMatrix: [
        [1, 0.5, 0.2, 0.3],
        [0.5, 1, 0.3, 0.4],
        [0.2, 0.3, 1, 0.1],
        [0.3, 0.4, 0.1, 1]
      ]
    },
    recommendations: [
      {
        id: 'r2001',
        type: 'diversification',
        asset: 'International Equities',
        message: 'Consider adding international exposure for better diversification',
        severity: 'medium',
        actionRequired: false
      },
      {
        id: 'r2002',
        type: 'tax_efficiency',
        asset: 'Overall Portfolio',
        message: 'Tax-loss harvesting opportunity in bond holdings',
        severity: 'low',
        actionRequired: false
      }
    ]
  }
};

export const getUserPortfolio = (username: string) => {
  return mockPortfolios[username as keyof typeof mockPortfolios] || null;
};

export type AssetType = 'stock' | 'etf' | 'bond' | 'crypto' | 'real_estate' | 'commodity' | 'forex';

export const assetTypeColors: Record<AssetType, string> = {
  stock: '#4F9EE8',
  etf: '#2F7D6D',
  bond: '#6C757D',
  crypto: '#F5B700',
  real_estate: '#1E4D8C',
  commodity: '#D9A84E',
  forex: '#8B5CF6'
};

export const mockMarketData = {
  stock: {
    'AAPL': { name: 'Apple Inc.', price: 185.92, change: 0.87, percentChange: 0.47 },
    'MSFT': { name: 'Microsoft Corporation', price: 325.93, change: 2.12, percentChange: 0.65 },
    'GOOGL': { name: 'Alphabet Inc.', price: 142.17, change: -0.83, percentChange: -0.58 },
    'AMZN': { name: 'Amazon.com Inc.', price: 178.65, change: 1.34, percentChange: 0.76 },
    'TSLA': { name: 'Tesla, Inc.', price: 245.37, change: -3.21, percentChange: -1.29 }
  },
  crypto: {
    'BTC': { name: 'Bitcoin', price: 41275.83, change: 1250.78, percentChange: 3.12 },
    'ETH': { name: 'Ethereum', price: 2238.85, change: -45.92, percentChange: -2.01 },
    'SOL': { name: 'Solana', price: 106.34, change: 4.25, percentChange: 4.16 },
    'ADA': { name: 'Cardano', price: 0.47, change: 0.02, percentChange: 4.45 },
    'BNB': { name: 'Binance Coin', price: 563.27, change: 12.78, percentChange: 2.32 }
  },
  forex: {
    'EUR/USD': { name: 'Euro/US Dollar', price: 1.12, change: 0.004, percentChange: 0.36 },
    'USD/JPY': { name: 'US Dollar/Japanese Yen', price: 142.87, change: -0.56, percentChange: -0.39 },
    'GBP/USD': { name: 'British Pound/US Dollar', price: 1.27, change: 0.008, percentChange: 0.63 },
    'USD/CHF': { name: 'US Dollar/Swiss Franc', price: 0.94, change: -0.003, percentChange: -0.32 },
    'AUD/USD': { name: 'Australian Dollar/US Dollar', price: 0.67, change: 0.002, percentChange: 0.30 }
  }
};

export const mockSystemMessages = [
  {
    id: 'm1001',
    userId: 1,
    type: 'risk_alert',
    title: 'High Cryptocurrency Exposure',
    message: 'Your portfolio has 28.81% allocated to cryptocurrencies, which exceeds the recommended maximum of 20% for your risk profile. Consider rebalancing to reduce volatility.',
    createdAt: '2023-04-02T10:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: 'm1002',
    userId: 1,
    type: 'opportunity',
    title: 'Bond Yield Opportunity',
    message: 'Current treasury bond yields have increased to attractive levels. Consider adding to your bond allocation to improve portfolio stability.',
    createdAt: '2023-04-01T14:15:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: 'm1003',
    userId: 1, 
    type: 'portfolio_update',
    title: 'Portfolio Rebalance Required',
    message: 'Your portfolio has drifted significantly from target allocations. Recommended rebalancing actions are available in your dashboard.',
    createdAt: '2023-03-28T09:45:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: 'm2001',
    userId: 2,
    type: 'opportunity',
    title: 'International Diversification',
    message: 'Your portfolio lacks international exposure. Consider adding international equity ETFs to improve diversification.',
    createdAt: '2023-04-02T11:20:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: 'm2002',
    userId: 2,
    type: 'tax_planning',
    title: 'Tax-Loss Harvesting Opportunity',
    message: 'There are potential tax-loss harvesting opportunities in your bond holdings that could offset capital gains.',
    createdAt: '2023-03-30T15:45:00Z',
    read: true,
    priority: 'low'
  }
];

export const getUserMessages = (userId: number) => {
  return mockSystemMessages.filter(message => message.userId === userId);
};

// Mock user items for sale
export const mockUserItems = [
  {
    id: 'i1001',
    userId: 1,
    title: 'Apple Inc. Stock - 10 shares',
    description: 'Selling 10 shares of Apple Inc. (AAPL) at market price.',
    price: 1859.20,
    listedDate: '2023-03-25T09:30:00Z',
    type: 'stock',
    status: 'active'
  },
  {
    id: 'i1002',
    userId: 1,
    title: 'Bitcoin - 0.5 BTC',
    description: 'Selling 0.5 Bitcoin (BTC) at fixed price, slightly below market.',
    price: 20500,
    listedDate: '2023-03-28T14:15:00Z',
    type: 'crypto',
    status: 'active'
  },
  {
    id: 'i1003',
    userId: 1,
    title: 'US Treasury Bond - $10,000 face value',
    description: '10-year US Treasury bond with 4.25% coupon rate.',
    price: 9870,
    listedDate: '2023-03-30T11:45:00Z',
    type: 'bond',
    status: 'active'
  },
  {
    id: 'i2001',
    userId: 2,
    title: 'Gold ETF - 20 shares',
    description: 'Selling 20 shares of GLD at market price.',
    price: 3366.40,
    listedDate: '2023-03-27T10:20:00Z',
    type: 'etf',
    status: 'active'
  },
  {
    id: 'i2002',
    userId: 2,
    title: 'EUR/USD - €10,000',
    description: 'Selling €10,000 at current market exchange rate.',
    price: 11200,
    listedDate: '2023-03-29T13:30:00Z',
    type: 'forex',
    status: 'active'
  }
];

export const getAllItems = () => {
  return mockUserItems;
};

export const getUserItems = (userId: number) => {
  return mockUserItems.filter(item => item.userId === userId);
};

export const removeItem = (itemId: string) => {
  const itemIndex = mockUserItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    mockUserItems.splice(itemIndex, 1);
    return true;
  }
  return false;
};
